import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  errorMessage: String;
  successMessage: String;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ChangePassword() {
    document.querySelector('form').classList.add('loading');
    this.authService.changePassword(this.changePasswordForm.value).subscribe(data => {
      setTimeout(() => {
        document.querySelector('form').classList.remove('loading');
        this.successMessage = 'Password changed successfully';
      }, 1000);
    }, err => {
      document.querySelector('form').classList.remove('loading');
      this.errorMessage = err.error.message
    });
    this.changePasswordForm.reset();
  }

}
