import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  users = [];
  user: any;
  userId: any;

  constructor(private userService: UserService, private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.userId = this.tokenService.GetPayload()._id;
    this.GetAllUsers();
  }

  GetAllUsers() {
    this.userService.getUser(this.userId).subscribe(data1 => {
      this.userService.getAllUsers().subscribe(data2 => {
        this.user = data1.user;
        this.users = data2.users;
      });
    });
  }

  IsFollowing(userId) {
    for(let i=0; i<this.user.following.length; i++) {
      if(this.user.following[i] === userId)
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
        this.GetAllUsers();
      });
    },1000);
  }

  OpenProfile(userId) {
    this.router.navigate(['profile',userId]);
  }

}
