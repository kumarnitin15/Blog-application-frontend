import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: String;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit() {
    let body = <any>document.querySelector('body');
    body.style.backgroundImage = 'linear-gradient(#9fb8ad, #2cb5e8)';

    let html = document.querySelector('html');
    html.style.overflowY = 'hidden';

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  Register() {
    this.router.navigate(['register']);
  }

  LoginUser() {
    (<HTMLElement>document.querySelector('#loginForm')).classList.add('loading');
    this.authService.loginUser(this.loginForm.value).subscribe(data => {
      this.tokenService.SetToken(data.token);
      this.loginForm.reset();
      setTimeout(() => {
        this.router.navigate(['home']);
        setTimeout(()=> {
        }, 1000);
      }, 1500);
    }, err => {
      (<HTMLElement>document.querySelector('#loginForm')).classList.remove('loading');
      if(err.error.message)
        this.errorMessage = err.error.message;
      this.loginForm.reset();
    });
  }

}
