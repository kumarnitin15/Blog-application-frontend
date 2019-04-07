import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-following',
  templateUrl: './profile-following.component.html',
  styleUrls: ['./profile-following.component.css']
})
export class ProfileFollowingComponent implements OnInit {

  user: any;
  currUser: any;
  userId: any;
  currUserId: any;
  following = [];

  constructor(private route: ActivatedRoute, private router: Router, private tokenService: TokenService, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.userId;
    this.currUserId = this.tokenService.GetPayload()._id;
    this.router.events.subscribe(val => {
      setTimeout(()=>{
        this.userId = this.route.snapshot.params.userId;
        this.GetFollowing();
      },200)
    });
    this.GetFollowing();
  }

  GetFollowing() {
    this.userService.getUser(this.userId).subscribe(data1 => {
      this.userService.getUser(this.currUserId).subscribe(data2 => {
        this.user = data1.user;
        this.currUser = data2.user;
        this.following = this.user.following;
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
        this.GetFollowing();
      });
    },1000);
  }

  UnfollowUser(userId, index) {
    let followLink = <any>document.getElementsByClassName(String(index))[0];
    if(followLink.classList.contains('disabled'))
      return;
    followLink.classList.add('disabled');
    followLink.style.color = '#ff9980';
    setTimeout(() => {
      this.userService.unfollowUser(userId).subscribe(data => {
        this.GetFollowing();
      });
    },1000);
  }

  OpenProfile(userId) {
    this.router.navigate(['profile',userId]);
  }

}