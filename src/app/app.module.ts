import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Material } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { TeamBoardComponent } from './team-board/team-board.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AdminComponent } from './admin/admin.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { LogoutAdminComponent } from './logout-admin/logout-admin.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TeamMemberComponent } from './team-member/team-member.component';

//for calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MessagesComponent } from './messages/messages.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { QuickWorkoutComponent } from './quick-workout/quick-workout.component';
import { TeamStatsComponent } from './team-stats/team-stats.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { OtherProfileComponent } from './other-profile/other-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    HomeLayoutComponent,
    RegistrationComponent,
    LoginComponent,
    NavbarComponent,
    SidenavComponent,
    DashboardComponent,
    ProfileComponent,
    CalendarComponent,
    LogoutComponent,
    TeamBoardComponent,
    AdminComponent,
    AdminNavbarComponent,
    AdminLayoutComponent,
    AdminHomeComponent,
    DeleteConfirmComponent,
    LogoutAdminComponent,
    TeamMemberComponent,
    MessagesComponent,
    MessageDetailsComponent,
    NotificationsComponent,
    QuickWorkoutComponent,
    TeamStatsComponent,
    SettingsComponent,
    ProfileDetailComponent,
    CreateTeamComponent,
    OtherProfileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    Material,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    NgSelectModule,
    NgbModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  entryComponents:[
    DeleteConfirmComponent,
    LogoutAdminComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
