import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfileDTO } from 'src/app/models/DTOS/userProfile.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: string = ''
  bio: string = ''
  nickname: string = ''
  age = 0

  bio_input = new FormControl()
  nickname_input = new FormControl()
  age_input = new FormControl()

  editing = false

  constructor(private userProfileService: UserProfileService,
              private notificationService: NotificationService) { }

  edit() {
    this.editing = !this.editing
  }

  update() {
    this.userProfileService.updateProfile({
      bio: this.bio_input.value,
      nickname: this.nickname_input.value,
      age: this.age_input.value
    }).then(res => {
      
      console.log("user data ", res)
      this.bio = res.bio
      this.nickname = res.nickname
      this.age = res.age
      
      this.bio_input.setValue(res.bio)
      this.nickname_input.setValue(res.nickname)
      this.age_input.setValue(res.age)

      this.editing = false
    }).catch(err => {
      this.notificationService.add("Error " + err)
    })    
  }

  ngOnInit(): void {
    this.userProfileService.fetchMyProfile().then(res => {
      
      console.log("user data", res)
      this.username = res.username
      this.bio = res.bio
      this.nickname = res.nickname
      this.age = res.age
      
      this.bio_input.setValue(res.bio)
      this.nickname_input.setValue(res.nickname)
      this.age_input.setValue(res.age)

    }).catch(err => {
      this.notificationService.add("Error " + err)
    })    
  }

}
