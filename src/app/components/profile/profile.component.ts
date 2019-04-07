import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  userId: any;
  currUserId: any;
  blogs = [];
  followers = [];
  following = [];
  currUser: any;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private tokenService: TokenService) { }

  ngOnInit() {
    this.init();
    this.GetUser();
  }

  init() {
    this.currUserId = this.tokenService.GetPayload()._id;
    this.userId = this.route.snapshot.params.userId;
    (<any>document.querySelector('.profilePicDiv')).style.display = 'none';
    this.router.events.subscribe(val => {
      location.reload();
    });
    let tabs = document.querySelectorAll('.profileMenu .item');
    let divs = <any>document.querySelectorAll('.divs div');
    for(let i=0; i<tabs.length; i++) {
      tabs[i].addEventListener('click', function() {
        for(let j=0; j<i; j++) {
          if(tabs[j].classList.contains('active')) {
            divs[j].style.display = 'none';
            tabs[j].classList.remove('active');
          }
        }
        for(let j=i+1; j<tabs.length; j++) {
          if(tabs[j].classList.contains('active')) {
            divs[j].style.display = 'none';
            tabs[j].classList.remove('active');
          }
        }
        divs[i].style.display = '';
        tabs[i].classList.add('active');
      })
    }
  }

  GetUser() {
    this.userService.getUser(this.userId).subscribe(data1 => {
      this.userService.getUser(this.currUserId).subscribe(data2 => {
        this.user = data1.user;
        this.currUser = data2.user;
        this.blogs = this.user.blogs;
        this.followers = this.user.followers;
        this.following = this.user.following;
      })
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
        this.GetUser();
      });
    },1000);
  }

  Follow() {
    let followLink = <any>document.querySelector('.followLink');
    if(followLink.classList.contains('disabled'))
      return;
    followLink.classList.add('disabled');
    followLink.style.color = '#ccebff';
    setTimeout(() => {
      this.userService.followUser(this.userId).subscribe(data => {
        this.GetUser();
      });
    },1000);
  }

}
