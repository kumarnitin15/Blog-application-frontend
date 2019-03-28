import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { BlogModule } from './modules/blog.module';
import { BlogRoutingModule } from './modules/blog-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthModule, AuthRoutingModule, BlogModule, BlogRoutingModule],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
