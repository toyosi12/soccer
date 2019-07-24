import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get<any>("/soccer-api/get_all_users.php");
  }

  deleteUser(user_id){
    return this.http.post<any>("/soccer-api/delete_user.php", user_id);
  }
}
