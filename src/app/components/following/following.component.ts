import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  following = [];
  user: any;
  loading = true;

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.GetAllFollowing();
  }

  GetAllFollowing() {
    this.userService.getUser(this.tokenService.GetPayload()._id).subscribe(data => {
      this.user = data.user;
      this.following = this.user.following;
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

  UnfollowUser(userId, index) {
    let followLink = <any>document.getElementsByClassName(String(index))[0];
    if(followLink.classList.contains('disabled'))
      return;
    followLink.classList.add('disabled');
    followLink.style.color = '#ff9980';
    setTimeout(() => {
      this.userService.unfollowUser(userId).subscribe(data => {
        this.GetAllFollowing();
      });
    },1000);
  }

  OpenProfile(userId) {
    this.router.navigate(['profile',userId]);
  }

}
