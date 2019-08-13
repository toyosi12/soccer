import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { NotificationServiceService } from '../notification-service.service';
@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe', {static: true}) private myScrollContainer: ElementRef;
  public basePath = "https://ionicbasis.com/soccer-api/";
  public passportPath;
  public _users;
  public user;
  public first_name;
  public last_name;
  public recipient_id;
  public message;
  public chatsToDisplay;
  public my_id;
  public messageLoaded = false;
  public notification;
  public value;
  public notify;
  readonly VAPID_PUBLIC_KEY = "BF-OaBBppQBiUC9Xv7A-BpRyJfqJRnsfBt4ZP8oyqA4wJ1izxGyC39dlP0oZwK3FjYS53AjC2nfyQF9JyDityPI";
  constructor(private users: UserService, private route: ActivatedRoute,
    public swPush: SwPush, public snackBar: MatSnackBar,
    private _notificationService: NotificationServiceService,) { 

    }

  ngOnInit() {
    this.scrollToBottom();
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.recipient_id = id;
    this.users.getTeamMembers().subscribe(data => {
      this._users = data;
      this.user = this._users.filter(data => data.user_id == id)[0];
      this.passportPath = (this.user.passport == null || this.user.passport == "") 
    ? "../../assets/avatar.png" 
    : this.basePath + "" + this.user.passport;
    this.first_name = this.user.first_name;
    this.last_name = this.user.last_name;
    this.getMyDetails();
    this.getChats();
    
    })
      
    this._notificationService.changeEmitted$.subscribe(data => {
      console.log(data);
      //alert(data);
    })

  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

  scrollToBottom(){
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }  
  }

  getMyDetails(){
    this.users.getUserDetails().subscribe(data=>{
      this.my_id  = data[0].user_id;
    })
  }
  getChats(){
    this.users.getChats({recipient_id: this.recipient_id}).subscribe(data => {
      this.chatsToDisplay = data;
      this.messageLoaded = true;
    })
  }
  sendMessage(){
    this.messageLoaded = false;
    this.users._sendMessage({recipient_id: this.recipient_id, message: this.message})
              .subscribe(data=>{
                //update dom if successful

                if(data.success){
                  this.getChats();
                  //this.message = "";
                  this.scrollToBottom();
                }
                // this.chatsToDisplay = [...this.chatsToDisplay, {
                //   message: this.message, sender_id:this.my_id, recipient_id: this.recipient_id, sent:"N"
                // }];
                // console.log(this.chatsToDisplay);

                //for notification
                  this.swPush.requestSubscription({
                    serverPublicKey : this.VAPID_PUBLIC_KEY
                  }).then(sub => {
                    let trans = {
                      user_id: this.recipient_id, user_id2: this.my_id, sub: sub, message: this.message
                    };
                    this._notificationService.saveEndpoint(trans).subscribe(data => {
                        
                        this._notificationService.addPushSubscriber(trans).subscribe(res => {
                        console.log(res); 
                        this.message = "";
                      })
                      })
                  })
              })
  }
}
