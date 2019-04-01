import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  user: any;
  myblogs = [];

  constructor(private tokenService: TokenService, private userService: UserService) {}

  ngOnInit() {
    document.querySelector('body').style.background = "";
    this.user = this.tokenService.GetPayload();
    this.GetUserBlogs();
  }

  GetUserBlogs() {
    this.userService.getUserBlogs(this.user._id).subscribe(data => {
      this.myblogs = data.blogs;
    });
  }

  TimeFromNow(date: Date) {
    return moment(date).fromNow();
  }

}
