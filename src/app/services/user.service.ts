import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDetails;
  constructor(private http: HttpClient) { }
  isLoggedIn(): Observable<any> {
    return this.http.get<any>("/soccer-api/is-logged-in.php");
  }

  isAdmin(): Observable<any> {
    return this.http.get<any>("/soccer-api/is-admin.php");
  }

  getUserDetails(){
    return this.http.get<any>("/soccer-api/get-user-details.php");
  }

  getMyTeam(){
    return this.http.get<any>("/soccer-api/get-my-team.php");
  }

  updateDetails(usr){
    console.log(usr);
    return this.http.post<any>("/soccer-api/update-user-details.php",usr);
  }

  getUsers(){
    return this.http.get<any>("/soccer-api/get_users.php");
  }
  saveTeam(details){
    return this.http.post<any>("/soccer-api/save-team.php", details);
  }

  sendInvite(details){
    return this.http.post<any>("/soccer-api/send-invite.php", details);
  }

  getTeamMembers(){
    return this.http.get<any>("/soccer-api/get-team-members.php");

  }

  saveEvents(events){
    return this.http.post<any>("/soccer-api/save-events.php", events);
  }

  getEvents(){
    return this.http.get<any>("/soccer-api/get-events.php");
  }

  deleteEvent(event){
    return this.http.post<any>("/soccer-api/delete-event.php", event);
  }

  _sendMessage(data){
    return this.http.post<any>("/soccer-api/send-chat.php",data);
  }

  getChats(data){
    return this.http.post<any>("/soccer-api/get-chats.php",data);

  }
  logout() {
    return this.http.get<any>("/soccer-api/logout.php");
  }

  getFriendSuggestions(){
    return this.http.get<any>("/soccer-api/get-friend-suggestions.php");
  }

  addFriend(user_id){
    return this.http.post<any>("/soccer-api/add-friend.php",user_id);

  }

  getFriends(){
    return this.http.get<any>("/soccer-api/get-friends.php");

  }

  acceptRequest(user_id){
    return this.http.post<any>("/soccer-api/accept-friend-request.php", user_id)
  }

  getCurrentUserDetails(user_id){
    return this.http.post<any>("/soccer-api/get-current-user-details.php", user_id);
  }
  

}
