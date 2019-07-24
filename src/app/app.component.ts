import { Component } from '@angular/core';
import {SwPush, SwUpdate} from "@angular/service-worker";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'soccer';
  public update = false;
  public snackBarRef;
  constructor(public swPush: SwPush, updates: SwUpdate, public snackBar: MatSnackBar){
    updates.available.subscribe( event => {
      this.snackBarRef = this.snackBar.open('A new version is available', "Update");
      setTimeout(()=>{
        this.snackBarRef.dismiss();
      },50000);
      this.snackBarRef.onAction().subscribe(() => {
        updates.activateUpdate().then(()=>document.location.reload());
      });
      
      this.update = true;
  })
}
}
