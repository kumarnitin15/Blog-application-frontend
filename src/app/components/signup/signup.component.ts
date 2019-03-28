import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: String;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit() {
    let body = <any>document.querySelector('body');
    body.style.backgroundImage = 'linear-gradient(#9fb8ad, #2cb5e8)';

    let html = document.querySelector('html');
    html.style.overflowY = 'hidden';

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      aboutMe: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  Login() {
    this.router.navigate(['login']);
  }

  SignupUser() {
    (<HTMLElement>document.querySelector('#signupForm')).classList.add('loading');
    this.authService.registerUser(this.signupForm.value).subscribe(data => {
      this.tokenService.SetToken(data.token);
      this.signupForm.reset();
      setTimeout(() => {
        this.router.navigate(['home']);
      }, 1500);
    }, err => {
      (<HTMLElement>document.querySelector('#signupForm')).classList.remove('loading');
      if(err.error.msg)
        this.errorMessage = err.error.msg[0].message;
      if(err.error.message)
        this.errorMessage = err.error.message;
      this.signupForm.reset();
    });
  }

}
