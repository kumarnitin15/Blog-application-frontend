import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
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

  blogs = [];
  currUser: any;
  profilePic: String;
  onlineBlogs = false;
  profileUser: any;

  @Input() data: any;

  constructor(private route: ActivatedRoute, private userService: UserService, private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data = changes.data.currentValue;
    this.init();
  }

  init() {
    this.currUser = this.tokenService.GetPayload();
    this.profilePic = this.data.profilePic;
    this.blogs = this.data.blogs;
    this.profileUser = this.data.user;
    this.onlineBlogs = false;
    for(let i=0; i<this.blogs.length; i++) {
      if(this.blogs[i].online) {
        this.onlineBlogs = true;
        break;
      }
    }
  }

  TimeFromNow(date: Date) {
    return moment(date).fromNow();
  }

  OpenBlog(blogId) {
    this.router.navigate(['blog', blogId]);
  }

 }
