import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { MatDialog } from '@angular/material';
import { LogoutComponent } from '../logout/logout.component';
import { LogoutAdminComponent } from '../logout-admin/logout-admin.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  public registered;
  public basePath = "http://localhost:8080/soccer-api/"
  public passportPath;
  public dialogRef;
  constructor(private _adminService: AdminService, private dialog?: MatDialog) { }

  ngOnInit() {
    this.getUsers();


  }

  getUsers(){
    this._adminService.getAllUsers().subscribe(data => {
      this.registered = data;
    })
  }

  deleteUser(user_id){
    this.dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: {user_id: user_id}
    })
    this.dialogRef.afterClosed().subscribe(data=>{
      this.getUsers();
      
    })
    
  }

  openDialog(){
    const dialogRef = this.dialog.open(LogoutAdminComponent)
  }


  

}
