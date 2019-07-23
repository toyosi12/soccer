import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public  userTypes;
  public RegForm: FormGroup;
  public lname;
  public fname;
  public email;
  public phone;
  public username;
  public password;
  public cpassword;
  public usertype;
  public snackBarRef;
  public userNameExists: boolean;
  public buttonText;
  @ViewChild('userExists', {static: true}) userExists
  @ViewChild('regButton',{ static: true}) regButton;
  constructor(private  auth: AuthService, private  fb: FormBuilder, public snackBar: MatSnackBar) {
    this.RegForm = this.fb.group({
      lname:['', Validators.compose([Validators.required])],
      fname:['', Validators.compose([Validators.required])],
      phone:['', Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.required, Validators.email])],
      username:['', Validators.compose([Validators.required])],
      password:['', Validators.compose([Validators.required, Validators.minLength(8)])],
      cpassword:['', Validators.compose([Validators.required])],
      usertype:['', Validators.compose([Validators.required])]

    })
   }

  ngOnInit() {
    this.buttonText = "Register";
    //get user types
    this.auth.getUserTypes().subscribe(data => {
      this.userTypes = data;
    })
    //console.log(document.getElementById('reg-btn').nodeValue);

  }

  checkIfUserNameExists(){
    let _text = this.userExists.nativeElement;
    let username = this.RegForm.get('username').value;
    _text.innerHTML = 'checking...'
    this.auth.checkIfUserNameExists(username).subscribe(data => {
      if(data.exists && username != ''){
        _text.innerHTML = "Username is taken";
        this.userNameExists = true;
      }else if(!data.exists && username != ''){
        _text.innerHTML = "Username is good";
        this.userNameExists = false;
      }
    })
  }
  registerUser(userDetails){
    if(this.userNameExists){
      this.snackBarRef = this.snackBar.open("Please choose another username", 'dismiss');
      setTimeout(()=>{
        this.snackBarRef.dismiss();
      },5000);
      return;
    }
    this.buttonText = "Loading...";
    this.auth.registerUser(userDetails.value).subscribe(data => {
      this.buttonText = "Register";
      this.snackBarRef = this.snackBar.open(data.message, 'dismiss');
      setTimeout(()=>{
        this.snackBarRef.dismiss();
      },5000);
    })
  }

}
