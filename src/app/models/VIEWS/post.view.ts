import { AvatarView } from "./avatar.view";
import { CommentView } from "./comment.view";

interface ReactionGroupBy {
    type: string
    count: number
} 

export interface PostView {
    id: Number
    postId: Number
    title: string
    text: string
    username: string,
    comments: CommentView[]
    createdAt: Date
    avatar: AvatarView
    likedByMe: boolean
    dislikedByMe: boolean
    reactions: [ReactionGroupBy]
    isMyPost: boolean
}