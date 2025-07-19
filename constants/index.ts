export const allThreads = [
    {
        id: 1,
        name: 'This is very long thread soo i can test this out',
        status: 'Not Scheduled',
        lastEdit: '2 minutes ago'
    },
    {
        id: 2,
        name: 'Thread 2',
        status: 'Scheduled',
        lastEdit: '5 days ago'
    },
    {
        id: 3,
        name: 'Thread 3',
        status: 'Posted',
        lastEdit: '10 days ago'
    }
    
    
];

export const statusColors = {
    'Not Scheduled': '#FDF2E9',
    'Scheduled': '#EBF8FF',
    'Posted': '#F0FDF4'
}

export const statusText = {
    'Not Scheduled': '#EA580C',
    'Scheduled': '#0369A1',
    'Posted': '#15803D'
}

export const THREAD_GENERATION_PROMPT = `
You are an expert Twitter thread writer. Generate a viral-style Twitter thread in this format:

- The intro of the topic should only be 1 tweet wich is the hook/intro and MUST NOT be numbered these should grab attention and set up the topic it should be small and concise straight to the point, and should always have the emoji 🧵 to indicate its a thread.
- After the intro tweet, you should NOT have a tweet that is the main content of the thread (e.g. "Here are X [tips/ways/things]...").
- The last intro tweet should be something like: "Here are X [tips/ways/things]..." (still unnumbered).
- Numbering ("1., 2.", etc.) starts ONLY with the first tip or item. Do NOT number the intro tweets, even if the user asks for a specific number of tweets.
- NEVER include the thread counter for example 1/7, 2/7 in the begging of the tweets just use the numbering of the format topic above of this one.
- After all tips, you may include a summary tweet (numbered or unnumbered), and a final call to action (unnumbered).
- Use line breaks and bullet points for clarity.
- Format your response as a JSON array of tweets, e.g.: [\"Tweet 1...\", \"Tweet 2...\", ...]
- Do NOT include any explanations or text outside the JSON array.
- Match the style and structure of this example:
- NEVER make a tweet with more than 280 characters and also dont separate tweets that is going to have more than 280 tweets, change the content to make it smaller.
- You should ALWAYS follow this thread structure adn follow all the bullet points of this prompt.

EXAMPLE:
[
(Intro tweet)
"Most men have low testosterone—and don't even know it.,\\n
They feel tired, weak, unmotivated,\\n
\\n
But you don't need injections to fix it,\\n
\\n
Here are 7 natural ways to boost testosterone 🧵,"
(Intro tweet end)
"1. Sleep 7–9 hours a night.\\n
\\n
Lack of sleep tanks testosterone levels faster than almost anything.\\n
\\n
Studies show sleeping just 5 hours a night cuts T levels by 15%.\\nSleep more, feel like a man again.",

"2. Lift heavy weights.\\n
\\n
Strength training is one of the fastest ways to spike testosterone.\\n
\\n
Focus on:\\n
\\n n
• Squats\\n
• Deadlifts\\n
• Bench press\\n
\\n
Train 3–4x per week. Go hard, but don't overdo it.",
"...",
"Summary: Do this consistently, and your testosterone will rise—naturally. No injections. No side effects.",
"Want more no-BS health & performance tips? Follow @yourhandle for daily threads."
]
    `
