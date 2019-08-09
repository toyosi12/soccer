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
  public basePath = "http://localhost:8080/soccer-api/"

  constructor(private _userService : UserService, private fb: FormBuilder,private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.getTeamMembers();
  }

  getTeamMembers(){
    this._userService.getTeamMembers().subscribe(data => {
      this.teamMembers = data.filter(data => data.status == 'accepted');
      console.log(this.teamMembers);

    })
  }
  
  handleRoute(r){
    this.router.navigate(['/home/messages', r.user_id])
  }

}
