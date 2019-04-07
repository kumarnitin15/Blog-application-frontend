import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile-blogs',
  templateUrl: './profile-blogs.component.html',
  styleUrls: ['./profile-blogs.component.css']
})
export class ProfileBlogsComponent implements OnInit {

  user: any;
  currUser: any;
  userId: any;
  currUserId: any;
  blogs = [];

  constructor(private route: ActivatedRoute, private userService: UserService, private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.userId;
    this.currUserId = this.tokenService.GetPayload()._id;
    this.router.events.subscribe(val => {
      setTimeout(()=>{
        this.userId = this.route.snapshot.params.userId;
        this.GetUser();
      },200)
    });
    this.GetUser();
  }

  GetUser() {
    this.userService.getUser(this.userId).subscribe(data1 => {
      this.userService.getUser(this.currUserId).subscribe(data2 => {
        this.user = data1.user;
        this.currUser = data2.user;
        this.blogs = this.user.blogs;
      });
    });
  }

  TimeFromNow(date: Date) {
    return moment(date).fromNow();
  }

}
