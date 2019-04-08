import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';
declare var Quill : any;
declare var $ : any;

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blogId: any;
  blog: any;
  user: any;
  quill: any;
  images = [];

  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    (<any>document.querySelector('.profilePicDiv')).style.display = 'none';
    this.blogId = this.route.snapshot.params.blogId;
    this.init();
  }

  init() {
    this.blogService.getBlogById(this.blogId).subscribe(data1 => {
      this.userService.getUser(data1.blog.user).subscribe(data2 => {
        this.blog = data1.blog;
        this.user = data2.user;
        this.images = this.user.images;

        setTimeout(()=>{
          this.quill = new Quill('#editor-container', {
            modules: {
              imageResize: {},
              toolbar: document.getElementById('toolbar-container')
            },
            placeholder: 'Start your blog here...',
            theme: 'snow'
          });
          document.querySelector('.ql-editor').innerHTML = this.blog.content;
          document.querySelector('#addImageIcon').addEventListener('click', function() {
            $('.ui.longer.modal.modal1').modal('show');
          });
        },500);

      });
    });
  }

  InsertImage(index) {
    var focus;
    let id = String(index);
    let url = (<any>document.getElementById(id)).src;
    this.quill.insertEmbed(this.quill.getSelection(focus=true).index, 'image', url);
    $('.ui.longer.modal.modal1').modal('hide');
  }

  SaveBlog() {
    if(document.querySelector('#saveIcon').classList.contains('disabled')) 
      return;
    document.querySelector('#saveIcon').classList.add('disabled');
    let topic = document.getElementById('blogTopic').innerText;
    let caption = document.getElementById('blogCaption').innerText;
    let blogContent = document.querySelector('.ql-editor').innerHTML;
    let mainImage = (<any>document.querySelector('.mainImage')).src;
    if(topic === this.blog.topic && caption === this.blog.caption && mainImage === this.blog.mainImage && blogContent === this.blog.content) {
      document.querySelector('#saveIcon').classList.remove('disabled');
      return;
    }
    this.blogService.saveBlog(this.blog._id, topic, caption, mainImage, blogContent).subscribe(data => {
      setTimeout(() => {
        document.querySelector('#saveIcon').classList.remove('disabled');
      }, 1000);
    }, err => {
      console.log(err);
    });
  }

  OpenModal() {
    $('.ui.longer.modal.modal2').modal('show');
  }

  ChangeMainImage(index) {
    let id = String(index);
    let url = (<any>document.getElementById(id)).src;
    (<any>document.querySelector('.mainImage')).src = url;
    $('.ui.longer.modal.modal2').modal('hide');
  }

  CreatedAt(date: Date) {
    return moment(date).format('MMM D');
  }

  OpenProfile(userId) {
    this.router.navigate(['profile',userId]);
  }

}
