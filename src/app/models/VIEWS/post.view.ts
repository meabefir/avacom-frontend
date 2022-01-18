import { CommentView } from "./comment.view";

export interface PostView {
    id: Number
    postId: Number
    title: string
    text: string
    username: string,
    comments: CommentView[]
    createdAt: Date
}