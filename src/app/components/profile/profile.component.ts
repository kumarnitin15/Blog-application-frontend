import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';
declare var $ : any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: any;
  currUserId: any;
  user: any;
  currUser: any;
  socket: any;
  loading = true;
  profileBlogsData = {
    blogs: [],
    profilePic: '',
    user: this.user
  };
  profileFollowersData = {
    currUser: this.currUser,
    followers: [],
    profileUser: this.user
  };
  profileFollowingData = {
    currUser: this.currUser,
    following: [],
    profileUser: this.user
  };

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private tokenService: TokenService) {
    this.socket = io('https://blogapp-backend.herokuapp.com');
  }

  ngOnInit() {
    (<any>document.querySelector('.profilePicDiv')).style.display = 'none';
    this.route.params.subscribe(val => {
      this.loading = true;
      this.init();
    })
    this.init();
  }

  init() {
    this.userId = this.route.snapshot.params.userId;
    this.currUserId = this.tokenService.GetPayload()._id;
    this.userService.getUser(this.userId).subscribe(data1 => {
      this.userService.getUser(this.currUserId).subscribe(data2 => {
        this.user = data1.user;
        this.currUser = data2.user;

        const blogsData = {
          blogs: this.user.blogs,
          profilePic: this.user.profilePic,
          user: this.user
        }
        this.profileBlogsData = blogsData;

        const followersData = {
          currUser: this.currUser,
          followers: this.user.followers,
          profileUser: this.user
        };
        this.profileFollowersData = followersData;
        
        const followingData = {
          currUser: this.currUser,
          following: this.user.following,
          profileUser: this.user
        }
        this.profileFollowingData = followingData;

        this.loading = false;
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

  FollowUser(userId) {
    let followLink = <any>document.querySelector('.followLink');
    if(followLink.classList.contains('disabled'))
      return;
    followLink.classList.add('disabled');
    followLink.style.color = '#ccebff';
    setTimeout(() => {
      this.userService.followUser(userId).subscribe(data => {
        const room_name1 = 'notifications-' + userId;
        this.socket.emit('refresh', room_name1);
        const room_name2 = 'side-' + userId;
        this.socket.emit('refresh', room_name2);
        this.init();
      });
    },1000);
  }

  SetDisplay(indexShow, indexHide1, indexHide2) {
    let profileMenuItems = (<any>document.querySelectorAll('.profileMenuItem'));
    let clickMenuItems = (<any>document.querySelectorAll('.clickMenuItem'));
    profileMenuItems[indexShow].style.display = '';
    profileMenuItems[indexHide1].style.display = 'none';
    profileMenuItems[indexHide2].style.display = 'none';
    clickMenuItems[indexShow].classList.add('activeClick');
    clickMenuItems[indexHide1].classList.remove('activeClick');
    clickMenuItems[indexHide2].classList.remove('activeClick');
  }

}
