import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-profile-followers',
  templateUrl: './profile-followers.component.html',
  styleUrls: ['./profile-followers.component.css']
})
export class ProfileFollowersComponent implements OnInit {

  user: any;
  currUser: any;
  userId: any;
  currUserId: any;
  followers = [];
  socket: any;

  constructor(private route: ActivatedRoute, private tokenService: TokenService, private userService: UserService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params.userId;
    this.currUserId = this.tokenService.GetPayload()._id;
    this.GetFollowers();
  }

  GetFollowers() {
    this.userService.getUser(this.userId).subscribe(data1 => {
      this.userService.getUser(this.currUserId).subscribe(data2 => {
        this.user = data1.user;
        this.currUser = data2.user;
        this.followers = this.user.followers;
      });
    });
  }

  IsFollowing(userId) {
    for(let i=0; i<this.currUser.following.length; i++) {
      if(this.currUser.following[i]._id === userId)
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
        this.GetFollowers();
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
