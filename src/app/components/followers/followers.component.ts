import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers = [];
  user: any;
  loading = true;
  socket: any;

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) {
    //this.socket = io('http://localhost:3000');
    this.socket = io('https://blogapp-backend.herokuapp.com');
  }

  ngOnInit() {
    this.GetAllFollowers();
  }

  GetAllFollowers() {
    this.userService.getUser(this.tokenService.GetPayload()._id).subscribe(data => {
      this.user = data.user;
      this.followers = this.user.followers;
      setTimeout(()=>{
        this.loading = false;
      },500)
    });
  }

  IsFollowing(userId) {
    for(let i=0; i<this.user.following.length; i++) {
      if(this.user.following[i]._id === userId)
      return true;
    }
    return false;
  }

  FollowUser(userId, index) {
    let followLink = <any>document.getElementsByClassName(String(index))[0];
    if(followLink.classList.contains('disabled'))
      return;
    followLink.classList.add('disabled');
    followLink.style.color = '#ccebff';
    setTimeout(() => {
      this.userService.followUser(userId).subscribe(data => {
        this.GetAllFollowers();
        const room_name1 = 'notifications-' + userId;
        this.socket.emit('refresh', room_name1);
        const room_name2 = 'side-' + userId;
        this.socket.emit('refresh', room_name2);
      });
    },1000);
  }

  OpenProfile(userId) {
    this.router.navigate(['profile',userId]);
  }

}
