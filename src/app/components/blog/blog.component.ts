import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import * as moment from 'moment';
import { TokenService } from 'src/app/services/token.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
declare var $ : any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogId: any;
  blog: any;
  user: any;
  userId: any;
  authorId: any;
  liked = false;
  shared = false;
  bookmarked = false;
  comments = [];
  commentForm: FormGroup;
  error = false;
  loading = true;

  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router, private tokenService: TokenService, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.userId = this.tokenService.GetPayload()._id;
    this.blogId = this.route.snapshot.params.blogId;
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
    (<any>document.querySelector('.profilePicDiv')).style.display = 'none';
    this.init();
  }

  init() {
    this.blogService.getBlogById(this.blogId).subscribe(data => {
      this.userService.getUser(this.userId).subscribe(data2 => {
        this.user = data2.user;

        this.blog = data.blog;
        this.authorId = this.blog.user;
        this.comments = this.blog.comments;
        this.loading = false;
        setTimeout(()=>{
          document.querySelector('.ql-editor').innerHTML = this.blog.content;
        },500);
        let flag = false;
        for(let i=0; i < this.blog.views.length; i++) {
          if(this.blog.views[i] == this.userId) {
            flag = true;
            break;
          }
        }
        if(!flag && this.userId !== this.blog.user) {
          this.blogService.addView(this.blog._id).subscribe(data => {});
       }

        for(let i=0; i<this.blog.likes.length; i++) {
          if(this.blog.likes[i] === this.userId) {
            this.liked = true;
            break;
          }
        }

        for(let i=0; i<this.blog.shares.length; i++) {
          if(this.blog.shares[i] === this.userId) {
            this.shared = true;
            break;
          }
        }

        for(let i=0; i<this.user.bookmarks.length; i++) {
          if(this.user.bookmarks[i] === this.blog._id) {
            this.bookmarked = true;
            break;
          }
        }
      });
    }, err => {
      this.error = true;
      this.loading = false;
    });
  }

  OpenProfile(userId) {
    this.router.navigate(['profile',userId]);
  }

  CreatedAt(date: Date) {
    return moment(date).format('MMM D');
  }

  TimeFromNow(date: Date) {
    return moment(date).fromNow();
  }

  ToggleCommentForm() {
    $('.commentFormDiv').toggle("slow");
  }

  AddLike() {
    let likeIcon = document.querySelector('.likeIcon');
    likeIcon.classList.add('disabled');
    this.blogService.addLike(this.blog._id).subscribe(data => {
      this.init(); 
    });
  }

  AddComment() {
    (<any>document.querySelector('.commentForm')).classList.add('loading');
    this.blogService.addComment(this.blog._id, this.commentForm.value.comment).subscribe(data => {
      this.commentForm.reset();
      // setTimeout(()=>{
      //   this.init();
      //   (<any>document.querySelector('.commentForm')).classList.remove('loading');
      // },1000);
      this.init();
      (<any>document.querySelector('.commentForm')).classList.remove('loading');
    });
  }

  ShareBlog() {
    let shareIcon = document.querySelector('.shareIcon');
    shareIcon.classList.add('disabled');
    this.blogService.shareBlog(this.blog._id).subscribe(data => {
      setTimeout(()=>{
        this.init();
      }, 1000);
    });
  }

  BookmarkBlog() {
    let bookmarkIcon = document.querySelector('.bookmarkIcon');
    bookmarkIcon.classList.add('disabled');
    this.userService.addBookmark(this.blog._id).subscribe(data => {
      setTimeout(()=>{
        this.init();
      }, 1000);
    });
  }

}
