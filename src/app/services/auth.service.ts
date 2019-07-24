import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;

  constructor(private http: HttpClient) { }

  setLoggedIn(value : boolean){
    this.loggedInStatus = value;
  }

  get isLoggedIn(){
    return this.loggedInStatus;
  }
  
  getUserTypes(){
    return this.http.get<any>('/soccer-api/load_user_types.php');
  }

  checkIfUserNameExists(username){
    return this.http.post<any>('/soccer-api/check_user.php', {data: username});
  }
  registerUser(userDetails){
    return this.http.post<any>('/soccer-api/register_user.php', userDetails);
  }

  loginUser(userDetails){
    return this.http.post<any>('/soccer-api/login.php', userDetails);
  }

  loginAdmin(userDetails){
    return this.http.post<any>('/soccer-api/login_admin.php', userDetails);
  }
}
