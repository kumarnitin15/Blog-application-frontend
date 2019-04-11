import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  following = [];
  user: any;
  loading = true;
  socket: any;

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) {
    //this.socket = io('http://localhost:3000');
    this.socket = io('https://blogapp-backend.herokuapp.com');
  }

  ngOnInit() {
    this.GetAllFollowing();
  }

  GetAllFollowing() {
    this.userService.getUser(this.tokenService.GetPayload()._id).subscribe(data => {
      this.user = data.user;
      this.following = this.user.following;
      setTimeout(()=>{
        this.loading = false;
      },500);
    });
  }

  IsFollowing(userId) {
    for(let i=0; i<this.user.following.length; i++) {
      if(this.user.following[i]._id === userId)
      return true;
    }
    return false;
  }

  UnfollowUser(userId, index) {
    let followLink = <any>document.getElementsByClassName(String(index))[0];
    if(followLink.classList.contains('disabled'))
      return;
    followLink.classList.add('disabled');
    followLink.style.color = '#ff9980';
    setTimeout(() => {
      this.userService.unfollowUser(userId).subscribe(data => {
        this.GetAllFollowing();
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
