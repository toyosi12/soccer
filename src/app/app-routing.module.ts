import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { TeamBoardComponent } from './team-board/team-board.component';
const routes: Routes = [
  { path: '', redirectTo: '/reg/login', pathMatch: 'full' },
  { 
    path:'reg', component:AuthLayoutComponent,
    children:[
      { path: '', component: LoginComponent },
      {path:'login', component: LoginComponent},
      {path:'registration', component: RegistrationComponent},
    ]
  },
  {
    path:'home', component:HomeLayoutComponent, canActivate: [AuthGuard],
    children:[
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {path:'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'calendar', component: CalendarComponent},
      {path:'logout', component: LogoutComponent},
      {path: 'team-board', component: TeamBoardComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: true, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
