import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {

  public _users;
  public user;
  public first_name;
  public last_name;
  public email;
  public phone;
  public school;
  public sport;
  public basePath = "https://ionicbasis.com/soccer-api/";
  public passportPath;
  public teamMembers;
  constructor(private _userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTeamMembers();

  }

  getTeamMembers(){
    this._userService.getTeamMembers().subscribe(data => {
      this.teamMembers = data.filter(data => data.status == 'accepted');
      console.log(this.teamMembers);

     
    })
  }

}
