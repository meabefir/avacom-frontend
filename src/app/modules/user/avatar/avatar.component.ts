import { Component, Input, OnInit } from '@angular/core';
import { AvatarView } from 'src/app/models/VIEWS/avatar.view';
import { NotificationService } from 'src/app/services/notification.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  images = {
    'body': ["static\\body\\femaleBody.png", "static\\body\\maleBody.png"],
    'hair': ["static\\hair\\malehair1.png", "static\\hair/femhair1.png", "static\\hair\\malehair2.png"],
    'noses': ["static\\nose\\femnose1.png", "static\\nose\\femnose2.png", "static\\nose\\malenose1.png", "static\\nose\\malenose2.png", "static\\nose\\malenose3.png"],
    'lips': ["static\\mouth\\femmouth1.png", "static\\mouth\\malemouth1.png", "static\\mouth\\malemouth2.png", "static\\mouth\\malemouth3.png"],
    'clothes': ["static\\clo\\femclo1.png", "static\\clo\\femclo2.png", "static\\clo\\maleclo1.png", "static\\clo\\maleclo2.png"],
    'eyes': ["static\\eyes\\femEye1.png", "static\\eyes\\femEye2.png", "static\\eyes\\maleEye1.png", "static\\eyes\\maleEye2.png"],
    'brows': ["static\\brows\\fembrow1.png", "static\\brows\\fembrow2.png", "static\\brows\\malebro1.png"]
  }

  @Input()
  size = 10

  @Input()
  avatar?: AvatarView

  @Input()
  editable: boolean = false

  editing: boolean = false

  constructor(private userService: UserProfileService,
            private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  
  containerStyles() {
    let styles = {
      // 'height': (this.size+2) + 'vh',
      'height': (this.size * 10) + 'px',
    };
    return styles;
  }

  imageStyles() {
    let styles = {
      'max-width': this.size * 10 + 'px',
      'left':  0,
    };
    return styles;
  }

  editStyle() {
    let styles = {
      'margin-top': (this.size*10) + 'px',
    };
    return styles;
  }

  editAvatar() {
    this.editing = !this.editing
  }

  updateAvatar() {
    if (this.avatar == undefined)
      return

    this.userService.updateAvatar(this.avatar)
    .then(res => {
    
      console.log("avatar resp ", res)

      this.editing = false
    }).catch(err => {
      this.notificationService.add("Error " + err)
    })    
  }

  edit (what: string) {
    if (this.avatar == undefined)
      return;
    if (what == 'eyes') {
      this.avatar.eyesId = (this.avatar.eyesId + 1) % this.images["eyes"].length;
    } else if (what == 'lips') {
      this.avatar.lipsId = (this.avatar.lipsId + 1) % this.images["lips"].length;
    } else if (what == 'nose') {
      this.avatar.noseId = (this.avatar.noseId + 1) % this.images["noses"].length;
    } else if (what == 'hair') {
      this.avatar.hairId = (this.avatar.hairId + 1) % this.images["hair"].length;
    } else if (what == 'brows') {
      this.avatar.browsId = (this.avatar.browsId + 1) % this.images["brows"].length;
    } else if (what == 'body') {
      this.avatar.bodyId = (this.avatar.bodyId + 1) % this.images["body"].length;
      if (this.avatar.bodyId == 0) {
        this.avatar.clothingId = 0;
      } else {
        this.avatar.clothingId = 2;
      }
    } else if (what == 'clothes') {
      this.avatar.clothingId = (this.avatar.clothingId + 1) % this.images["clothes"].length;
      
      if (this.avatar.bodyId == 0 && this.avatar.clothingId > 1) {
        this.avatar.clothingId -= 2;
      } else if (this.avatar.bodyId == 1 && this.avatar.clothingId < 2) {
        this.avatar.clothingId += 2;
      }
    }
  }

}
