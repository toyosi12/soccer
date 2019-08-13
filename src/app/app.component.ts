import { Component } from '@angular/core';
import {SwPush, SwUpdate} from "@angular/service-worker";
import { MatSnackBar } from '@angular/material';
import { NotificationServiceService } from './notification-service.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'soccer';
  readonly VAPID_PUBLIC_KEY = "BF-OaBBppQBiUC9Xv7A-BpRyJfqJRnsfBt4ZP8oyqA4wJ1izxGyC39dlP0oZwK3FjYS53AjC2nfyQF9JyDityPI";
  public update = false;
  public snackBarRef;
  constructor(public swPush: SwPush, updates: SwUpdate, public snackBar: MatSnackBar,
    private _notificationService: NotificationServiceService, private _userService: UserService){
    updates.available.subscribe( event => {
      this.snackBarRef = this.snackBar.open('A new version is available', "Update");
      setTimeout(()=>{
        this.snackBarRef.dismiss();
      },50000);
      this.snackBarRef.onAction().subscribe(() => {
        updates.activateUpdate().then(()=>document.location.reload());
      });
      
      this.update = true;
  })

  this.subscribeToNotifications();
  this.showMessages()
}

subscribeToNotifications() {

  this.swPush.requestSubscription({
    serverPublicKey : this.VAPID_PUBLIC_KEY
  }).then(sub => {
      this._userService.getUserDetails().subscribe(data => {
          let trans = {'user_id':data[0].user_id, 'sub': sub};
          this._notificationService.saveEndpoint(trans).subscribe(data => {
          //   this._notificationService.addPushSubscriber(trans).subscribe(res => {
          //   console.log(res); 
          // })
          })

      })
       


  })
}

showMessages() {

  this.swPush.messages
    .subscribe(message => {
      this._notificationService.notificationMessage(message);

    })

}
}
