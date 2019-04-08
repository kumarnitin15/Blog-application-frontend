import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import io from 'socket.io-client';

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
  loading = true;
  socket: any;

  constructor(private tokenService: TokenService, private userService: UserService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.GetNotifications();
    this.socket.on('refreshPage', ()=>{
      const url = this.router.url;
      if(url.startsWith('/notifications'))
        this.GetNotifications();
    })
  }

  GetNotifications() {
    this.userService.getNotifs().subscribe(data => {
      this.user = data.user;
      this.notifications = this.user.notifications;
      this.profilePics = data.profilePics;
      this.unreadNotifs = 0;
      for(let i = 0; i < this.notifications.length; i++) {
        if(!this.notifications[i].read)
          this.unreadNotifs++;
      }
      setTimeout(()=>{
        this.loading = false;
      },500);
      const room_name = 'notifications-' + this.user._id;
      this.socket.emit('join room', room_name);
    });
  }

  TimeFromNow(date: Date) {
    return moment(date).fromNow();
  }

  MarkAllAsRead() {
    this.userService.markAllNotifs().subscribe(data => {
      this.GetNotifications();
      const room_name = 'side-' + this.user._id;
      this.socket.emit('refresh', room_name);
    });
  }

  MarkAsRead(index) {
    this.userService.markNotif(index).subscribe(data => {
      this.GetNotifications();
      const room_name = 'side-' + this.user._id;
      this.socket.emit('refresh', room_name);
    });
  }

  DeleteNotif(index) {
    this.userService.deleteNotif(index).subscribe(data => {
      this.GetNotifications();
      const room_name = 'side-' + this.user._id;
      this.socket.emit('refresh', room_name);
    });
  }

  DeleteAllNotifs() {
    this.userService.deleteAllNotifs().subscribe(data => {
      this.GetNotifications();
      const room_name = 'side-' + this.user._id;
      this.socket.emit('refresh', room_name);
    });
  }

  OpenProfile(userId) {
    this.router.navigate(['profile',userId]);
  }

}
