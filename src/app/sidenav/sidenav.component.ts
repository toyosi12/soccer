import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy {
  public basePath = "http://localhost:8080/soccer-api/"
  public passportPath;
  public userType;
  mobileQuery: MediaQueryList;



  fillerNav;

 
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _userService: UserService,
            private dialog?: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(){
    this._userService.getUserDetails().subscribe(data => {
      this.passportPath = (data[0].passport == null || data[0].passport == "") 
                          ? "../../assets/avatar.png" 
                          : this.basePath + "" + data[0].passport;
                          this.userType = data[0].user_type;
      
      //load sidenav for coach
      if(this.userType == 'coach'){
        this.fillerNav = [
          {icon: 'account_circle', name: 'Profile', route: 'profile'},
          {icon: 'calendar_today', name: 'Calendar', route: 'calendar'},
          {icon: 'fastfood', name: 'Team Nutrition', route: 'team-nutrition'},
          {icon: 'accessibility', name: 'Quick Workout', route: 'quick-workout'},
          {icon: 'message', name: 'Messages', route: 'messages'},
          {icon: 'notifications', name: 'Notifications', route: 'Notifications'},
          {icon: 'show_chart', name: 'Team stats', route: 'my-stats'},
          {icon: 'group_work', name: 'Team Board', route: 'team-board'},
          {icon: 'settings', name: 'Settings', route: 'settings'},
        ]
      }else if(this.userType == 'athlete'){
        this.fillerNav = [
          {icon: 'account_circle', name: 'Profile', route: 'profile'},
          // {icon: 'accessibility', name: 'Quick Workout', route: 'quick-workout'},
          // {icon: 'fastfood', name: 'Nutrition', route: 'team-nutrition'},
          {icon: 'message', name: 'Messages', route: 'messages'},
          {icon: 'notifications', name: 'Notifications', route: 'Notifications'},
          // {icon: 'show_chart', name: 'My stats', route: 'my-stats'},
          // {icon: 'group_work', name: 'Team Board', route: 'team-board'},
          // {icon: 'how_to_reg', name: 'Mental Prep', route: 'mental-prep'},
          {icon: 'settings', name: 'Settings', route: 'settings'},
        ]
      }
      //console.log(this.passportPath);
    })
  }

  openDialog(){
    const dialogRef = this.dialog.open(LogoutComponent)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }
}
