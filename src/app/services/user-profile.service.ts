import { Injectable } from '@angular/core';
import { baseUrl } from '../app.module';
import { UserProfileDTO } from '../models/DTOS/userProfile.dto';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private notificationService: NotificationService) { }

  async updateProfile(body_data: UserProfileDTO) {
    
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    return await fetch(`${baseUrl}/userProfile/myProfile`,{
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body_data)
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
      this.notificationService.add("Error " + err)
    })
  }

  async fetchMyProfile() {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    return await fetch(`${baseUrl}/userProfile/myProfile`,{
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
      return data
    })
    .catch(err => {
      this.notificationService.add("Error " + err)
    })
  }

  async getUserProfile(username: string) {
    let token = localStorage.getItem("token");
    if (token == null)
      token = "";
    return await fetch(`${baseUrl}/userProfile/profile/${username}`,{
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
      return data
    })
    .catch(err => {
      this.notificationService.add("Error " + err)
    })
  }

}
