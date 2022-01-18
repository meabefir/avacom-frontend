import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-profile-visit',
  templateUrl: './profile-visit.component.html',
  styleUrls: ['./profile-visit.component.scss']
})
export class ProfileVisitComponent implements OnInit {

  username: string | null = "";
  loading = true

  bio = ""
  nickname = ""
  age = 0

  constructor(private route: ActivatedRoute,
              private userProfileService: UserProfileService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get("username") 

    this.userProfileService.getUserProfile(this.username != null ? this.username : "").then(res => {
      
      console.log("fetched user profile ", res)
      this.loading = false
      this.bio = res.bio
      this.nickname = res.nickname
      this.age = res.age
      
    }).catch(err => {
      this.notificationService.add("Error " + err)
      this.loading = true
      this.username = "User not found."
    })    
  }

}
