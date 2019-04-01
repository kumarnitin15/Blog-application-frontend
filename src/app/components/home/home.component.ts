import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { BlogService } from 'src/app/services/blog.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  blogs = [];

  constructor(private tokenService: TokenService, private blogService: BlogService) { }

  ngOnInit() {
    document.querySelector('body').style.background = "";
    this.user = this.tokenService.GetPayload();
    this.GetAllBlogs();
  }

  GetAllBlogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data.blogs;
    });
  }

  TimeFromNow(date: Date) {
    return moment(date).fromNow();
  }

}
