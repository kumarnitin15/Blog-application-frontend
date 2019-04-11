import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bookmarked-blogs',
  templateUrl: './bookmarked-blogs.component.html',
  styleUrls: ['./bookmarked-blogs.component.css']
})
export class BookmarkedBlogsComponent implements OnInit {

  profilePics = [];
  bookmarkedBlogs = [];
  loading = true;

  constructor(private blogService: BlogService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.blogService.bookmarkedBlogs().subscribe(data => {
      this.bookmarkedBlogs = data.blogs;
      this.profilePics = data.profilePics;
      setTimeout(()=>{
        this.loading = false;
      }, 500);
    });
  }

  TimeFromNow(date: Date) {
    return moment(date).fromNow();
  }

  OpenBlog(blogId) {
    this.router.navigate(['blog',blogId]);
  }

  RemoveBookmark(index) {
    let icon = document.querySelectorAll('.bookmarkIcon')[index];
    icon.classList.add('disabled');
    this.userService.removeBookmark(index).subscribe(data => {
      setTimeout(()=>{
        this.init();
      }, 1000);
    });
  }

}
