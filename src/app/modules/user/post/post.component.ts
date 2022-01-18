import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommentView } from 'src/app/models/VIEWS/comment.view';
import { PostView } from 'src/app/models/VIEWS/post.view';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()
  postData?: PostView 

  showComments = false
  commenting = false

  newCommentFormControll: FormControl = new FormControl()

  constructor(private postService: PostService,
            private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  async postComment() {
    if (!this.postData)
      return
    await this.postService.postComment({
      text: this.newCommentFormControll.value,
      postId: this.postData.id
    }).then(res => {
      //this.errorService.add(res.message)
      
      this.notificationService.add("Comment posted")
      
      this.postService.fetchFeed()

    }).catch(err => {
      this.notificationService.add("Error " + err)
    })    
  }

}
