import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class AuthModule { }
