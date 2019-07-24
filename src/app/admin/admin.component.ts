import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public LoginForm: FormGroup;
  public snackBarRef;
  public loginText;
  hide = true;
  constructor(private auth: AuthService, private  fb: FormBuilder, public snackBar: MatSnackBar, private router: Router,
              private user: UserService) {
    this.loginText = "Login";
    this.LoginForm = this.fb.group({
      username:['', Validators.compose([Validators.required])],
      password:['', Validators.compose([Validators.required])],
     

    })
   }

  ngOnInit() {
  }

  loginUser(details){
    this.loginText = "Loading...";
    let message;
    this.auth.loginAdmin(details.value).subscribe(data => {
      if(!data.success){
        message = "Login Failed";
      }else{
        message = "Login successful";
        this.auth.setLoggedIn(true);
        this.router.navigateByUrl('/admin-layout/admin-home');
        //console.log(data);
      }
        this.snackBarRef = this.snackBar.open(message, 'dismiss');
        setTimeout(()=>{
          this.snackBarRef.dismiss();
        },5000);
        this.loginText = "Login";
    })
  }

}


