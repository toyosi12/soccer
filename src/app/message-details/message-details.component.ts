import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {
  public basePath = "http://localhost:8080/soccer-api/";
  public passportPath;
  public _users;
  public user;
  public first_name;
  public last_name;
  public recipient_id;
  public message;
  public chatsToDisplay;
  public my_id;
  constructor(private users: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
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
  }

  getMyDetails(){
    this.users.getUserDetails().subscribe(data=>{
      this.my_id  = data[0].user_id;
    })
  }
  getChats(){
    this.users.getChats({recipient_id: this.recipient_id}).subscribe(data => {
      this.chatsToDisplay = data;
    })
  }
  sendMessage(){
    this.users._sendMessage({recipient_id: this.recipient_id, message: this.message})
              .subscribe(data=>{
                console.log(data);
              })
  }
}
