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
  public my_id;
  public allFriends = [];
  public friendRequests = [];
  ngOnInit() {
    this.user.getUserDetails().subscribe(data => {
      this.userDetails = data[0];
    })

    this.getNotifications();
    this.getMyDetails();
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

  getMyDetails(){
    this.user.getUserDetails().subscribe(data=>{
      this.my_id  = data[0].user_id;
      //this.getFriendSuggestions();
      
      //get friends
      this.user.getFriends().subscribe(data => {
        this.allFriends = data.filter(data => data.accepted == 'Y');
        this.friendRequests = data.filter(data => data.accepted == 'N' 
                                          && data.sender_id != this.my_id);
        // console.log(data);
      })
    })
  }

  acceptRequest(user_id){
    this.user.acceptRequest({user_id: user_id}).subscribe(data =>{
      this.getMyDetails();
    })
  }

}
