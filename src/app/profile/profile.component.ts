import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public updateForm: FormGroup;
  public userTypes;
  public image = "../../assets/avatar.png";
  public passport;
  public snackBarRef;
  public basePath = "https://ionicbasis.com/soccer-api/"
  public passportPath;
  public buttonText = "Update";
  public userDetails: any = [];
  public myTeam;
  public friendSuggestions = [];
  public allFriends = [];
  public friendRequests = [];
  selectedFile: File = null;
  public my_id;
  public allUsers;
  public searchedUser;
  constructor(private fb: FormBuilder, private auth: AuthService, private _userService: UserService,
              private snackBar: MatSnackBar, private router: Router) {
   
   }

  ngOnInit() {
    this.auth.getUserTypes().subscribe(data => {
      this.userTypes = data;
    })
    this._userService.getUserDetails().subscribe(data => {
     this.userDetails = data[0];
      this.passportPath = (data[0].passport == null || data[0].passport == "") 
    ? "../../assets/avatar.png" 
    : this.basePath + "" + data[0].passport;
    });

    this._userService.getMyTeam().subscribe(data => {
      this.myTeam = data[0].team_name;
    })
     
    this.getMyDetails();
    this._userService.getAllUsers().subscribe(data => {
      this.allUsers = data;
    })
    
    
  }

  searchUser(){
    this.router.navigate(['/home/user', this.searchedUser]);
  }
  getMyDetails(){
    this._userService.getUserDetails().subscribe(data=>{
      this.my_id  = data[0].user_id;
      this.getFriendSuggestions();
      
      //get friends
      this._userService.getFriends().subscribe(data => {
        this.allFriends = data.filter(data => data.accepted == 'Y');
        this.friendRequests = data.filter(data => data.accepted == 'N' 
                                          && data.sender_id != this.my_id);
      })
    })
  }

  displayPassport(files: File[]) {
    if (files.length > 0) {
      this.selectedFile = files[0];
      // console.log(this.selectedFile);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.passportPath = event.target.result;
        this.updateForm.value.passport = this.image;
        //console.log(event.target.result);
      };

      reader.readAsDataURL(this.selectedFile);
      this.passport = this.selectedFile.name;
      //console.log(event);
    }
  }

  updateProfile(user) {
    this.buttonText = "Loading...";
    let fd;
    let smessage;
    if (this.selectedFile == null) {
      fd = user; //update without passport if passport was not changed
      //console.log(fd);
    } else {
      //update all including passport if passport was changed
      fd = new FormData();
      fd.append("textData", JSON.stringify(user));
      fd.append("with_passport", true);
      fd.append("passport", this.selectedFile, this.selectedFile.name);

    }
    
    this._userService.updateDetails(fd).subscribe(data => {
      if (data.success) {
        smessage = "Update successful";
      } else {
        smessage = data.message;
      }
      this.snackBarRef = this.snackBar.open(smessage, 'dismiss');
      setTimeout(()=>{
        this.snackBarRef.dismiss();
      },5000);
      this.buttonText = "Update";
    });
   
  }

  getFriendSuggestions(){
    this._userService.getFriendSuggestions().subscribe(data => {
      this.friendSuggestions = data;
    })
  }

  addFriend(user_id){
    this._userService.addFriend({user_id: user_id}).subscribe(data => {
      if(data.success){
        this.getFriendSuggestions();
      }
    })
  }

  acceptRequest(user_id){
    this._userService.acceptRequest({user_id: user_id}).subscribe(data =>{
      this.getMyDetails();
    })
  }

  handleRoute(r){
    this.router.navigate(['/home/user', r.user_name])
  }


}
