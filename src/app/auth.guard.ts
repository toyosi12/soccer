import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth : AuthService, private router : Router, private _userService: UserService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if(this.auth.isLoggedIn){
      //   return true;
      // }
    return this._userService.isLoggedIn().pipe(map(res => {
      if(res.status){
        this.auth.setLoggedIn(true);
        return true;
      }else{
        this.router.navigate(['/reg/login']);
        return false;
      }
    }));
  }
}
