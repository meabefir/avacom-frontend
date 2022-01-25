import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PostReactionDTO } from 'src/app/models/DTOS/postReaction.dto';
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

  async like() {
    if (this.postData == undefined)
      return
    let body: PostReactionDTO = {
      postId: this.postData.id,
      reactionType: "like"
    }
    await this.postService.reactToPost(body)
    .then(res => {
      //this.errorService.add(res.message)
      
      console.log(res)
      if (this.postData == undefined)
        return
      this.postData.likedByMe = true
      this.postData.dislikedByMe = false

      for (let reaction of this.postData.reactions) {
        if (reaction.type == "like") {
          reaction.count++;
        } else {
          reaction.count--;
        }
      }
      
      this.postData

    }).catch(err => {
      this.notificationService.add("Error " + err)
    })    
  }

  async delete() {
    if (this.postData == undefined)
      return

    await this.postService.deletePost(this.postData.id)
    .then(res => {
      this.notificationService.add(res.message)
      
      console.log(res)
      if (this.postData != undefined)
        this.postService.removePost(this.postData)

    }).catch(err => {
      this.notificationService.add("Error " + err)
    })    
  }

  async dislike() {
    if (this.postData == undefined)
      return
    let body: PostReactionDTO = {
      postId: this.postData.id,
      reactionType: "dislike"
    }
    await this.postService.reactToPost(body)
    .then(res => {
      //this.errorService.add(res.message)
      
      console.log(res)
      if (this.postData == undefined)
        return
      this.postData.dislikedByMe = true
      this.postData.likedByMe = false
      for (let reaction of this.postData.reactions) {
        if (reaction.type == "dislike") {
          reaction.count++;
        } else {
          reaction.count--;
        }
      }

    }).catch(err => {
      this.notificationService.add("Error " + err)
    })    
  }

}
