import { Models } from "node-appwrite";

type Threads = Models.DocumentList<Models.Document> & {
    $id: string;
    name: string;
    status: string;
    lastEdit: string;
}

export interface Thread {
    id: string;
    user_id: string;
    name: string;
    status: 'Not Scheduled' | 'Scheduled' | 'Posted';
    topic: string;
    writing_style: string;
    thread_length: number;
    tweets: string[];
    created_at: string;
    updated_at: string;
}

export interface ThreadDisplay {
    id: string;
    name: string;
    status: 'Not Scheduled' | 'Scheduled' | 'Posted';
    lastEdit: string;
}