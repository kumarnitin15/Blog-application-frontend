import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
declare var $ : any;

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  user: any;
  myblogs = [];
  profilePic: String;
  loading = true;

  constructor(private tokenService: TokenService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    document.querySelector('body').style.background = "";
    this.user = this.tokenService.GetPayload();
    this.GetUserBlogs();
  }

  GetUserBlogs() {
    this.userService.getUserBlogs(this.user._id).subscribe(data => {
      this.myblogs = data.blogs;
      this.profilePic = data.profilePic;
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

  EditBlog(blogId) {
    this.router.navigate(['edit-blog',blogId]);
  }

  DeleteBlog(blogId) {
    $('.ui.basic.modal').modal('show');
    $('.deleteBlogConf').unbind().click(function() {
      console.log('Deleting blog...');
    })
  }

}
