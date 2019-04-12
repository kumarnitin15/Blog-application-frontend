import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
declare var $ : any;

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {

  newBlogForm: FormGroup;
  user: any;
  errorMessage: String;
  images = [];

  constructor(private fb: FormBuilder, private blogService: BlogService, private userService: UserService, private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.newBlogForm = this.fb.group({
      topic: ['', Validators.required],
      caption: ['', Validators.required]
    });
    this.init();
    this.userService.getUser(this.tokenService.GetPayload()._id).subscribe(data => {
      this.user = data.user;
      this.images = this.user.images;
    });
  }

  init() {
    $('.ui.dropdown').dropdown({
      showOnFocus: true,
      maxSelections: 3
    });
    document.querySelector('.chooseImg').addEventListener('click', () => {
      const query = '.ui.longer.modal.' + this.user.username;
      $(query).modal('show');
      let images = <any>document.querySelectorAll('.image img');
      for(let i=0; i<images.length; i++) {
        images[i].addEventListener('click', function() {
            let im = <any>document.querySelector('.displayImage');
            im.src = images[i].src;
            im.style.display = '';
            $(query).modal('hide');  
        });
      }
    });
  }

  CreateNewBlog() {
    document.querySelector('form').classList.add('loading');
    document.querySelector('.createBtn').classList.add('disabled');
    const topic = this.newBlogForm.value.topic;
    const tags = (<any>document.querySelector('.dropdownInput')).value;
    const caption = this.newBlogForm.value.caption;
    let im = <any>document.querySelector('.displayImage');
    if(topic.length == 0 || tags.length == 0 || caption.length == 0) {
      document.querySelector('form').classList.remove('loading');
      document.querySelector('.createBtn').classList.remove('disabled');
      this.errorMessage = 'Please fill out all the fields';
      return;
    }
    if(topic.length < 20) {
      document.querySelector('form').classList.remove('loading');
      document.querySelector('.createBtn').classList.remove('disabled');
      this.errorMessage = 'Topic must have atleast 20 characters';
      return;
    }
    if(topic.length > 200) {
      document.querySelector('form').classList.remove('loading');
      document.querySelector('.createBtn').classList.remove('disabled');
      this.errorMessage = 'Topic cannot have more than 200 characters';
      return;
    }
    if(tags.split(',').length < 1) {
      document.querySelector('form').classList.remove('loading');
      document.querySelector('.createBtn').classList.remove('disabled');
      this.errorMessage = 'Choose atleast one tag for the blog';
      return;
    }
    if(caption.length < 10) {
      document.querySelector('form').classList.remove('loading');
      document.querySelector('.createBtn').classList.remove('disabled');
      this.errorMessage = 'Caption must have atleast 10 characters';
      return;
    }
    if(caption.length > 200) {
      document.querySelector('form').classList.remove('loading');
      document.querySelector('.createBtn').classList.remove('disabled');
      this.errorMessage = 'Caption cannot have more than 200 characters';
      return;
    }

    if(im.style.display === 'none') {
      document.querySelector('form').classList.remove('loading');
      document.querySelector('.createBtn').classList.remove('disabled');
      this.errorMessage = 'You have to select one image for the blog';
      return;
    }
    
    this.blogService.createNewBlog(topic, caption,  tags, im.src).subscribe(data => {
      this.router.navigate(['blog', data.blog._id]);
    }, err => {
      document.querySelector('form').classList.remove('loading');
      document.querySelector('.createBtn').classList.remove('disabled');
      this.errorMessage = 'Error occured! Please try again';
      console.log(err);
    });
  }

}
