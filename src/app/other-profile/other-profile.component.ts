import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css']
})
export class OtherProfileComponent implements OnInit {
  public image = "../../assets/avatar.png";
  public passportPath;
  public userDetails: any = [];
  public basePath = "https://ionicbasis.com/soccer-api/"
  public friendship;
  public user;
  public buttonText = 'Add Friend';
  public loaded = false;
  constructor(private _userService : UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get('user');
    this._userService.otherUserDetails({user_name: this.user}).subscribe(data => {
      this.userDetails = data[0];
      this.passportPath = (data[0].passport == null || data[0].passport == "") 
    ? "../../assets/avatar.png" 
    : this.basePath + "" + data[0].passport;

      this.checkFriendship();
    })
  }

  checkFriendship(){
        this._userService.checkFriendship({user_name: this.user}).subscribe(data => {
          console.log(data);
          if(data.length == 0){
            //not friends
            this.friendship = 'not-friends'
          }else{
            if(data[0].accepted == 'Y'){
              //friends
              this.friendship = 'friends';
            }else{
              this.friendship = 'friend-request-sent';
            }
          }
          // console.log(this.friendship);
          this.loaded = true;
        })
  }

    addFriend(user_id){
      this.buttonText = "Loading...";
      this._userService.addFriend({user_id: user_id}).subscribe(data => {
        if(data.success){
          this.checkFriendship();
          this.buttonText = "Friend Request Sent";
        }
      })
    }

    handleRoute(user_id){
      console.log(user_id);
      this.router.navigate(['/home/messages', user_id])

    }

}
