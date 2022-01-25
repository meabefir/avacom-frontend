import { Injectable } from '@angular/core';
import { baseUrl } from '../app.module';
import { CommentDTO } from '../models/DTOS/comment.dto';
import { PostDTO } from '../models/DTOS/post.dto';
import { PostReactionDTO } from '../models/DTOS/postReaction.dto';
import { PostView } from '../models/VIEWS/post.view';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts : PostView[] = []

  fetchedFeed = false

  constructor(public notificationService: NotificationService) { }

  addPost(new_post: PostView) {
    this.posts.unshift(new_post)
  }

  removePost(postData: PostView) {
    const index = this.posts.indexOf(postData, 0);
    if (index > -1) {
      this.posts.splice(index, 1);
    }
  }

  async fetchFeed() {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    return await fetch(`${baseUrl}/post/feed`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      // console.log(res.status)
      if (res.ok == false)
      {
        throw res.status;
      }
      return res.json()
    })
    .then(data => {
      console.log("posts fetched ", data)
      this.posts = data
      this.posts.reverse()
      this.fetchedFeed = true
    })
    .catch(err => {
      throw(err)
    })
  }

  async reactToPost(react_dto: PostReactionDTO) {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";

    return await fetch(`${baseUrl}/postReaction/create`,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(react_dto)
    })
    .then(res => {
      // console.log(res.status)
      if (res.ok == false)
      {
        throw res.status;
      }
      return res.json()
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      throw(err)
    })
  }

  async postComment(comment_dto: CommentDTO) {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";

    return await fetch(`${baseUrl}/post/comment`,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment_dto)
    })
    .then(res => {
      // console.log(res.status)
      if (res.ok == false)
      {
        throw res.status;
      }
      return res.json()
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      throw(err)
    })
  }

  async post(post_dto: PostDTO) {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    return await fetch(`${baseUrl}/post/create`,{
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post_dto)
    })
    .then(res => {
      // console.log(res.status)
      if (res.ok == false)
      {
        throw res.status;
      }
      return res.json()
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      throw(err)
    })
  }

  async deletePost(postId: Number) {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    return await fetch(`${baseUrl}/post/${postId}`,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      // console.log(res.status)
      if (res.ok == false)
      {
        throw res.status;
      }
      return res.json()
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      throw(err)
    })
  }
}
