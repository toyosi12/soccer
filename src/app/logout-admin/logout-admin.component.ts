import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-logout-admin',
  templateUrl: './logout-admin.component.html',
  styleUrls: ['./logout-admin.component.css']
})

export class LogoutAdminComponent implements OnInit {
  constructor(private user : UserService, private router: Router, private auth : AuthService,
    public dialogRef: MatDialogRef<LogoutAdminComponent>) { }

  ngOnInit() {

  }

  cancelDialog(){
    this.dialogRef.close();
  }

  logout(){
    this.user.logout().subscribe(data => {
      if(data.success){
        this.router.navigate(['/admin-layout/admin']);
        this.auth.setLoggedIn(false);
      }else{
        console.log('an error occurred');
      }
      this.dialogRef.close();
    })
  }

}

