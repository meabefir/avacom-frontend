import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(public notificationService: NotificationService,
    private _snackBar: MatSnackBar) { }

  openSnackBar() {
    let first_error = this.notificationService.messages[0]
    Promise.resolve().then(() => {
      // this._snackBar.dismiss()

      let snack_bar_ref = this._snackBar.open(first_error, "Close", {
        duration: 3000,
      });

      this.notificationService.remove()
    })
    
  }

  ngOnInit(): void {
  }

}
