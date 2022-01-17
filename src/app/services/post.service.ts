import { Injectable } from '@angular/core';
import { baseUrl } from '../app.module';
import { PostDTO } from '../models/DTOS/post.dto';
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
      console.log(data)
      this.posts = data
      this.posts.reverse()
      this.fetchedFeed = true
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
}
