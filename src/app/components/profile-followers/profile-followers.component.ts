import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-profile-followers',
  templateUrl: './profile-followers.component.html',
  styleUrls: ['./profile-followers.component.css']
})
export class ProfileFollowersComponent implements OnInit {

  socket: any;
  followers = [];
  profileUser: any;
  currUser: any;

  @Input() data: any;

  @Output() initEvent = new EventEmitter();

  constructor(private route: ActivatedRoute, private tokenService: TokenService, private userService: UserService, private router: Router) {
    this.socket = io('https://blogapp-backend.herokuapp.com');
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data = changes.data.currentValue;
    this.init();
  }

  init() {
    this.followers = this.data.followers;
    this.currUser = this.data.currUser;
    this.profileUser = this.data.profileUser;
  }

  IsFollowing(userId) {
    for(let i=0; i<this.currUser.following.length; i++) {
      if(this.currUser.following[i]._id === userId)
      return true;
    }
    return false;
  }

  FollowUser(userId, index) {
    const query = 'follow' + String(index);
    let followLink = <any>document.getElementsByClassName(query)[0];
    // let followLink = <any>document.getElementsByClassName(String(index))[0];
    if(followLink.classList.contains('disabled'))
      return;
    followLink.classList.add('disabled');
    followLink.style.color = '#ccebff';
    setTimeout(() => {
      this.userService.followUser(userId).subscribe(data => {
        const room_name1 = 'notifications-' + userId;
        this.socket.emit('refresh', room_name1);
        const room_name2 = 'side-' + userId;
        this.socket.emit('refresh', room_name2);
        this.initEvent.emit();
      });
    },1000);
  }

  OpenProfile(userId) {
    this.router.navigate(['profile', userId]);
  }

}
