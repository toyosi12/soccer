import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  public value = "";

  constructor(private http: HttpClient) { 
    //this.value = 100;
  }
  public notification;
  public notify = new BehaviorSubject<any>(this.notification);
  changeEmitted$ = this.notify.asObservable();
  saveEndpoint(data:any){
    return this.http.post('/soccer-api/save-notification-info.php', data);
  }

  addPushSubscriber(sub:any){
    return this.http.post('/soccer-api/notifications/vendor/minishlink/web-push/src/notify.php', sub);
  }

  notificationMessage(message){
    this.notification = message;
    this.notify.next(this.notification);
    console.log('servie', this.notification.notification);
    return this.notification;
  }

  get _notification(){
    return this.notification.notification;
  }

  sendNotification(data){
    return this.http.post<any>('/soccer-api/send-notification.php', data);
  }

  getNotifications(){
    return this.http.get<any>("/soccer-api/get-notifications.php");
  }

  // test()  {
  //   this.value++;
  //   this.notify.next(this.value)
  // }
}
