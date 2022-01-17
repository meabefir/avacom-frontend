import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FriendRequestService } from 'src/app/services/friend-request.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  friendUsername = new FormControl('');

  constructor(public friendRequestService: FriendRequestService,
              private notificationService: NotificationService,
              private routerService: Router) { }

  ngOnInit(): void {
    this.friendRequestService.fetchFriendRequests()
  }
  
  async sendRequest() {
    await this.friendRequestService.sendFriendRequest(this.friendUsername.value)
    .then(res => {
      
      this.notificationService.add(res.message)
      //this.notificationService.add(`Invitation was sent to user ${this.friendUsername.value}`)

      this.friendUsername.reset()

    }).catch(err => {
      this.notificationService.add("Error " + err)
      if (err == 401)
      {
        this.routerService.navigate(['/login'])
      }
    })    
  }

}