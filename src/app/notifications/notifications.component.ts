import { Component, OnInit } from '@angular/core';
import { NotificationServiceService } from '../notification-service.service';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private user: UserService, private _notificationService:  NotificationServiceService, private snackBar: MatSnackBar) { }
  public message;
  public snackBarRef;
  public buttonText = "Send Notification";
  public userDetails:any = [];
  public notifications = [];
  ngOnInit() {
    this.user.getUserDetails().subscribe(data => {
      this.userDetails = data[0];
    })

    this.getNotifications();
  }

  sendMessage(){
    if(this.message == ""){
      return;
    }
    let smessage;
    this.buttonText = "Loading...";
    this._notificationService.sendNotification({message: this.message}).subscribe(data => {
      if(data.success){
        smessage = "Successful!";
      }else{
        smessage = "Failed, Please try again";
      }
      this.snackBarRef = this.snackBar.open(smessage, 'dismiss');
      setTimeout(()=>{
        this.snackBarRef.dismiss();
      },5000);
      this.buttonText = "Send Notification";
    })
  }

  getNotifications(){
    this._notificationService.getNotifications().subscribe(data => {
      this.notifications = data;
    })
  }

}
