import { Injectable } from '@angular/core';
import { baseUrl } from '../app.module';
import { FriendView } from '../models/VIEWS/friend.view';
import { FriendRequestView } from '../models/VIEWS/friendRequest.view';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  friendRequests: FriendRequestView[] = []
  friends: FriendView[] = []

  fetchedFR = false
  fetchedFriends = false

  constructor(private notificationService: NotificationService) { }

  removeFRFrom(username: string) {
    let idx = 0;
    while (idx < this.friendRequests.length)
    {
      if (this.friendRequests[idx].username == username)
        break
      idx ++
    }
    if (idx == this.friendRequests.length)
      return

    this.friendRequests.splice(idx, 1)
  }

  async fetchFriendRequests() {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    var ret = await fetch(`${baseUrl}/FriendRequest/received`,{
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
      this.friendRequests = data
      this.friendRequests.reverse()
      console.log("FR fetched ", data)
    })
    .catch(err => {
      this.notificationService.add("Error " + err)
    })
    this.fetchedFR = true
    return ret
  }

  async fetchFriends() {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    var ret = await fetch(`${baseUrl}/Friend`,{
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
      this.friends = data
      this.friends.reverse()
      console.log("friends fetched ", data)
    })
    .catch(err => {
      this.notificationService.add("Error " + err)
    })
    this.fetchedFriends = true
    return ret
  }

  async sendFriendRequest(username: string) {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    return await fetch(`${baseUrl}/FriendRequest/send/${username}`,{
      method: 'POST',
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
      return data
    })
    .catch(err => {
      throw(err)
    })
  }

  async confirmFriendRequest(username: string) {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    return await fetch(`${baseUrl}/FriendRequest/accept/${username}`,{
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
      return data;
    })
    .catch(err => {
      this.notificationService.add("Error " + err)
    })
  }

  async declineFriendRequest(username: string) {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    return await fetch(`${baseUrl}/FriendRequest/delete/${username}`,{
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
      this.notificationService.add("Error " + err)
    })
  }
}
