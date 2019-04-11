import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  socket: any;
  user: any;
  unreadNotifs = 0;

  constructor(private tokenService: TokenService, private userService: UserService) {
    // this.socket = io('http://localhost:3000');
    this.socket = io('https://blogapp-backend.herokuapp.com');
  }

  ngOnInit() {
    this.socket.on('refreshPage', () => {
      this.init();
    });
    this.init();
  }

  init() {
    this.userService.getUser(this.tokenService.GetPayload()._id).subscribe(data => {
      this.user = data.user;
      this.unreadNotifs = 0;
      for(let i=0; i<this.user.notifications.length; i++) {
        if(!this.user.notifications[i].read)
          this.unreadNotifs += 1;
      }
      const room_name = 'side-' + this.user._id;
      this.socket.emit('join room', room_name);
    });
  }

}
