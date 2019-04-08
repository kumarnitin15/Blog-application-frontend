import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { BlogService } from 'src/app/services/blog.service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  blogs = [];
  profilePics = [];
  loading = true;

  constructor(private tokenService: TokenService, private blogService: BlogService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    document.querySelector('body').style.background = "";
    this.user = this.tokenService.GetPayload();
    this.GetAllBlogs();
  }

  GetAllBlogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.profilePics = data.profilePics;
      this.blogs = data.blogs;
      setTimeout(()=>{
        this.loading = false;
      },500)
    });
  }

  TimeFromNow(date: Date) {
    return moment(date).fromNow();
  }

  OpenBlog(blogId) {
    this.router.navigate(['blog',blogId]);
  }

}
