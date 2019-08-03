import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-board',
  templateUrl: './team-board.component.html',
  styleUrls: ['./team-board.component.css']
})
export class TeamBoardComponent implements OnInit {
  public users;
  public teamForm: FormGroup;
  public inviteForm: FormGroup;
  public buttonText = "Save Team";
  public buttonText2 = "Send Invite";
  public snackBarRef;
  public teamMembers;
  public invitedMembers;
  public basePath = "http://localhost:8080/soccer-api/"

  constructor(private _userService : UserService, private fb: FormBuilder,private snackBar: MatSnackBar,
              private router: Router) { 
    this.teamForm = this.fb.group({
      teamName: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    })

    this.inviteForm = this.fb.group({
      inviteEmail: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  ngOnInit() {
    this._userService.getUsers().subscribe(data => {
      this.users = data;
    })

    this.getTeamMembers();
  }

  saveTeam(details){
    let smessage;
    this.buttonText = "Loading...";
    this._userService.saveTeam(details).subscribe(data => {
      if(data.success){
        smessage = "Successful!";
      }else{
        smessage = "Failed, Please try again";
      }
      this.snackBarRef = this.snackBar.open(smessage, 'dismiss');
      setTimeout(()=>{
        this.snackBarRef.dismiss();
      },5000);
      this.buttonText = "Save Team";

    })
  }

  getTeamMembers(){
    this._userService.getTeamMembers().subscribe(data => {
      this.teamMembers = data.filter(data => data.status == 'accepted');
      console.log(this.teamMembers);

      this.invitedMembers = data.filter(data => data.status == 'invited');
    })
  }


  sendInvite(details){
    let smessage;
    this.buttonText2 = "Send Invite";
    this._userService.sendInvite(details).subscribe(data => {
      if(data.success){
        smessage = "Invitation sent successfully";
        this.getTeamMembers();
      }else{
        smessage = "Failed, Please try again";
      }
      this.snackBarRef = this.snackBar.open(smessage, 'dismiss');
      setTimeout(()=>{
        this.snackBarRef.dismiss();
      },5000);
      this.buttonText = "Save Team";

    })
  }

  handleRoute(r){
    this.router.navigate(['/home/team-board', r.user_id])
  }

}
