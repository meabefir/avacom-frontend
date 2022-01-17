import { Injectable } from '@angular/core';
import { baseUrl } from '../app.module';
import { FriendRequestView } from '../models/VIEWS/friendRequest.view';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  friendRequests: FriendRequestView[] = []

  fetched = false

  constructor(private notificationService: NotificationService) { }

  async fetchFriendRequests() {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    return await fetch(`${baseUrl}/FriendRequest/received`,{
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
      console.log(data)
    })
    .catch(err => {
      this.notificationService.add("Error " + err)
    })
    this.fetched = true
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
}
