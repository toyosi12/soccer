import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

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
  public buttonText = "Update"
  selectedFile: File = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private _userService: UserService,
              private snackBar: MatSnackBar) {
    this.updateForm = this.fb.group({
      lname:['', Validators.compose([Validators.required])],
      fname:['', Validators.compose([Validators.required])],
      phone:['', Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.required, Validators.email])],
      sport:['', Validators.compose([Validators.required])],
      school:['', Validators.compose([Validators.required])],


    })
   }

  ngOnInit() {
    this.auth.getUserTypes().subscribe(data => {
      this.userTypes = data;
    })
    this._userService.getUserDetails().subscribe(data => {
      this.updateForm.controls["lname"].setValue(data[0].last_name);
      this.updateForm.controls["fname"].setValue(data[0].first_name);
      this.updateForm.controls["email"].setValue(data[0].email);
      this.updateForm.controls["phone"].setValue(data[0].phone);
      this.updateForm.controls["school"].setValue(data[0].school);
      this.updateForm.controls["sport"].setValue(data[0].sport);
      this.passportPath = (data[0].passport == null || data[0].passport == "") 
    ? "../../assets/avatar.png" 
    : this.basePath + "" + data[0].passport;
    });

    

    
  }

  displayPassport(files: File[]) {
    if (files.length > 0) {
      this.selectedFile = files[0];
      // console.log(this.selectedFile);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.image = event.target.result;
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
}
