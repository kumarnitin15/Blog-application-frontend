import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
  }

  LogoutUser() {
    this.tokenService.DeleteToken();
    this.router.navigate(['login']);
  }

}
