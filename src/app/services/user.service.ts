import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  updateDetails(usr){
    console.log(usr);
    return this.http.post<any>("/soccer-api/update-user-details.php",usr);
  }

  getUsers(){
    return this.http.get<any>("/soccer-api/get_users.php");
  }

  logout() {
    return this.http.get<any>("/soccer-api/logout.php");
  }
}
