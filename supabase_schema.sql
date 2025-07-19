-- =============================================
-- ThreadEx - Supabase Database Schema
-- =============================================

-- Create the threads table
CREATE TABLE threads (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Not Scheduled' CHECK (status IN ('Not Scheduled', 'Scheduled', 'Posted')),
  topic TEXT NOT NULL,
  writing_style TEXT NOT NULL DEFAULT 'informative',
  thread_length INTEGER NOT NULL DEFAULT 7,
  tweets JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create an index on user_id for faster queries
CREATE INDEX idx_threads_user_id ON threads(user_id);

-- Create an index on created_at for sorting
CREATE INDEX idx_threads_created_at ON threads(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own threads
CREATE POLICY "Users can view their own threads" ON threads
  FOR SELECT USING (auth.uid() = user_id);

-- Users can only insert their own threads
CREATE POLICY "Users can insert their own threads" ON threads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own threads
CREATE POLICY "Users can update their own threads" ON threads
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can only delete their own threads
CREATE POLICY "Users can delete their own threads" ON threads
  FOR DELETE USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_threads_updated_at 
  BEFORE UPDATE ON threads 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Optional: Create a view for easier querying
-- =============================================
CREATE VIEW threads_with_metadata AS
SELECT 
  t.*,
  EXTRACT(EPOCH FROM (NOW() - t.created_at)) as seconds_since_created,
  jsonb_array_length(t.tweets) as tweet_count,
  u.email as user_email
FROM threads t
LEFT JOIN auth.users u ON t.user_id = u.id;

-- Grant access to the view
GRANT SELECT ON threads_with_metadata TO authenticated;

-- =============================================
-- Sample data (optional - for testing)
-- =============================================
-- Note: Replace 'your-user-id-here' with an actual user ID from auth.users
-- INSERT INTO threads (user_id, name, topic, writing_style, thread_length, tweets, status) VALUES
-- ('your-user-id-here', 'Sample Thread', 'How to use Twitter effectively', 'professional', 5, 
--  '["Tweet 1 content here", "Tweet 2 content here", "Tweet 3 content here"]', 'Not Scheduled'); 