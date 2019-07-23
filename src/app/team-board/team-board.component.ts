import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-team-board',
  templateUrl: './team-board.component.html',
  styleUrls: ['./team-board.component.css']
})
export class TeamBoardComponent implements OnInit {
  public users;
  constructor(private _userService : UserService) { 

  }

  ngOnInit() {
    this._userService.getUsers().subscribe(data => {
      this.users = data;
    })
  }

}
