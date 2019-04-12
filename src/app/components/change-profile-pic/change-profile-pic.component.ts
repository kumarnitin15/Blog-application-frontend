import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';
declare var $ : any;

@Component({
  selector: 'app-change-profile-pic',
  templateUrl: './change-profile-pic.component.html',
  styleUrls: ['./change-profile-pic.component.css']
})
export class ChangeProfilePicComponent implements OnInit {

  user: any;
  images = [];
  successMessage: String;
  errorMessage: String;
  socket: any;

  constructor(private userService: UserService, private tokenService: TokenService) {
    this.socket = io('https://blogapp-backend.herokuapp.com');
  }

  ngOnInit() {
    this.GetImages();
    this.init();
  }

  GetImages() {
    this.userService.getUser(this.tokenService.GetPayload()._id).subscribe(data => {
      this.user = data.user;
      this.images = this.user.images;
    });
  }

  init() {
    document.querySelector('.chooseBtn').addEventListener('click', () => {
      const query = '.ui.longer.modal.' + this.user.username;
      (<any>document.querySelector('.successText')).style.display = 'none';
      (<any>document.querySelector('.errorText')).style.display = 'none';
      $(query).modal('show');
      let images = <any>document.querySelectorAll('.image img');
      for(let i=0; i<images.length; i++) {
        images[i].addEventListener('click', function() {
            let im = <any>document.querySelector('.displayImage');
            im.src = images[i].src;
            im.style.display = '';
            (<any>document.querySelector('.updateBtn')).style.display = '';
            $(query).modal('hide');  
        });
      }
    });
  }

  UpdateProfilePic() {
    let img = <any>document.querySelector('.displayImage');
    let imgSrc = img.src;
    let btn = <any>document.querySelector('.updateBtn');
    btn.innerHTML = 'Updating...';
    this.userService.updateProfilePic(imgSrc).subscribe(data => {
      setTimeout(() => {
        btn.innerHTML = 'Update';
        btn.style.display = 'none';
        img.style.display = 'none';
        this.successMessage = 'Updated successfully';
        (<any>document.querySelector('.successText')).style.display = '';
        const room_name = 'navbar-' + this.user._id;
        this.socket.emit('refresh', room_name);
      },1000)
    }, err => {
      this.errorMessage = 'Error occured! Please try again';
      (<any>document.querySelector('.errorText')).style.display = '';
    });
  }

}
