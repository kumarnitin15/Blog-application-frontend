import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService) {}
  
  ngOnInit() {
    const token = this.tokenService.GetToken();
    if(token) {
      let url = window.location.href.split('/');
      if(url.length > 4 || (url.length === 4 && url[3] !== '')) {
        let route = [];
        for(let i=3; i<url.length; i++)
          route.push(url[i]);
        console.log(route);
        this.router.navigate(route);
      }
      else 
        this.router.navigate(['home']);
    }
    else {
      this.router.navigate(['login']);
    }
  }
  
}
