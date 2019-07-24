import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {
  public snackBarRef;
  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private _adminService: AdminService,  public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  cancelDialog(){
    this.dialogRef.close();
  }

  deleteUser(){
    let message;
     this._adminService.deleteUser({user_id: this.data.user_id}).subscribe(data => {
      if(data.success){
        message = "Deleted successfully";
      }else{
        message = "Failed, Please try again";
      }
      this.snackBarRef = this.snackBar.open(message, 'dismiss');
      setTimeout(()=>{
        this.snackBarRef.dismiss();
      },5000);

      this.dialogRef.close();
    })
  }



}
