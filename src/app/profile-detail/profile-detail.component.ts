import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  public userDetails: any = [];
  public passportPath;
  public basePath = "https://ionicbasis.com/soccer-api/"

  constructor(private route: ActivatedRoute, private user: UserService) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.user.getCurrentUserDetails({user_id: id}).subscribe(data => {
        this.userDetails = data[0];
        this.passportPath = (data[0].passport == null || data[0].passport == "") 
        ? "../../assets/avatar.png" 
        : this.basePath + "" + data[0].passport;
    })
  }

}
