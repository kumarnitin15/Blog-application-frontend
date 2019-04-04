import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  user: any;
  notifications = [];
  profilePics = [];
  unreadNotifs = 0;

  constructor(private tokenService: TokenService, private userService: UserService) { }

  ngOnInit() {
    this.GetNotifications();
  }

  GetNotifications() {
    this.userService.getNotifs().subscribe(data => {
      this.notifications = data.notifications;
      this.profilePics = data.profilePics;
      this.unreadNotifs = 0;
      for(let i = 0; i < this.notifications.length; i++) {
        if(!this.notifications[i].read)
          this.unreadNotifs++;
      }
    });
  }

  TimeFromNow(date: Date) {
    return moment(date).fromNow();
  }

  MarkAllAsRead() {
    this.userService.markAllNotifs().subscribe(data => {
      this.GetNotifications();
    });
  }

  MarkAsRead(index) {
    this.userService.markNotif(index).subscribe(data => {
      this.GetNotifications();
    });
  }

  DeleteNotif(index) {
    this.userService.deleteNotif(index).subscribe(data => {
      this.GetNotifications();
    });
  }

  DeleteAllNotifs() {
    this.userService.deleteAllNotifs().subscribe(data => {
      this.GetNotifications();
    });
  }

}
