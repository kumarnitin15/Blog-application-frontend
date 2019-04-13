import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import io from 'socket.io-client';
declare var $ : any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router, private userService: UserService) { }

  user: any;
  users = [];
  content = [];
  socket: any;

  ngOnInit() {
    //this.socket = io('http://localhost:3000');
    this.socket = io('https://blogapp-backend.herokuapp.com');
    this.init();
    this.socket.on('refreshPage', () => {
      this.init();
    });
  }

  init() {
    this.userService.getUser(this.tokenService.GetPayload()._id).subscribe(data => {
      this.user = data.user;
      this.userService.getAllUsers().subscribe(data2 => {
        this.users = data2.users;
        for(let i=0; i<this.users.length; i++) {
          this.content.push({title: this.users[i].username});
        }
        $('.ui.search').search({
          source: this.content
        });
        let r = this.router;
        $('.searchDiv').keyup(function (e) {
          if (e.keyCode === 13) {
             let user = document.querySelector('.searchDiv .active .title').innerHTML;
             (<any>document.querySelector('.searchDiv input')).value = '';
             for(let i=0; i<data2.users.length; i++) {
               if(data2.users[i].username === user)
                r.navigate(['profile',data2.users[i]._id]);
             }
          }
        });
      });
      const room_name = 'navbar-' + this.user._id;
      this.socket.emit('join room', room_name);
    });
  }

  OpenHome() {
    this.router.navigate(['home']);
  }

  LogoutUser() {
    this.tokenService.DeleteToken();
    this.router.navigate(['login']);
  }

  OpenProfile(userId) {
    this.router.navigate(['profile',userId]);
  }

}
