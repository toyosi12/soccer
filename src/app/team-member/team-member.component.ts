import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {
  public _users;
  public user;
  public first_name;
  public last_name;
  public email;
  public phone;
  public school;
  public sport;
  public basePath = "http://localhost:8080/soccer-api/";
  public passportPath;
  constructor(private users: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.users.getTeamMembers().subscribe(data => {
      this._users = data;
      this.user = this._users.filter(data => data.user_id == id)[0];
      this.passportPath = (this.user.passport == null || this.user.passport == "") 
    ? "../../assets/avatar.png" 
    : this.basePath + "" + this.user.passport;
    this.first_name = this.user.first_name;
    this.last_name = this.user.last_name;
    this.email = this.user.email;
    this.phone = this.user.phone;
    this.sport = this.user.sport;
    this.school = this.user.school;
    })
  }

}
