import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostView } from 'src/app/models/VIEWS/post.view';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  title = new FormControl('')
  text = new FormControl('')

  constructor(public postService: PostService,
              public notificationService: NotificationService,
              private routerService: Router) { }

  ngOnInit(): void {
  }
  
  async post() {
    if (!this.validatePostData())
      return;

    await this.postService.post({
      text: this.text.value,
      title: this.title.value
    }).then(res => {
      //this.errorService.add(res.message)
      
      this.notificationService.add("Post created")
      
      this.postService.fetchFeed()

      this.text.reset()
      this.title.reset()

      // login successful
    }).catch(err => {
      this.notificationService.add("Error " + err)
      if (err == 401)
      {
        this.routerService.navigate(['/login'])
      }
      // login failed
    })    
  }

  validatePostData(): boolean {
    if (this.title.value.length < 1)
    {
      this.notificationService.add("At least one character for the title.")
      return false
    }
    if (this.title.value.length > 50)
    {
      this.notificationService.add("Too many characters in the title.")
      return false
    }
    if (this.text.value.length < 1)
    {
      this.notificationService.add("At least one character for the content.")
      return false
    }
    if (this.text.value.length > 1000)
    {
      this.notificationService.add("At most 1000 characters for the content.")
      return false
    }
    return true
  }

}
