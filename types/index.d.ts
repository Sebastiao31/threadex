import { Models } from "node-appwrite";

type Threads = Models.DocumentList<Models.Document> & {
    $id: string;
    name: string;
    status: string;
    lastEdit: string;
}