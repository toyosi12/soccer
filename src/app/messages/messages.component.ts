import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public teamMembers;
  public teamMembersLength;
  public users
  public basePath = "https://ionicbasis.com/soccer-api/"

  constructor(private _userService : UserService, private fb: FormBuilder,private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.getUserMessages();
  }

  getTeamMembers(){
    this._userService.getTeamMembers().subscribe(data => {
      this.teamMembers = data.filter(data => data.status == 'accepted');
      this.teamMembersLength = this.teamMembers.length;
      console.log(this.teamMembers);

    })
  }

  getUserMessages(){
    this._userService.getUserDetails().subscribe(da => { 
      this._userService.getUserMessages().subscribe(data => {
        this.users = data.filter(data => data.user_name != da[0].user_name);
        console.log(this.users);
      })
  })

  }
  
  handleRoute(r){
    this.router.navigate(['/home/messages', r.user_id])
  }

}
