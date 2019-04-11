import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { BlogModule } from './modules/blog.module';
import { BlogRoutingModule } from './modules/blog-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor';
import { UserModule } from './modules/user.module';
import { UserRoutingModule } from './modules/user-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthModule, AuthRoutingModule, BlogModule, BlogRoutingModule, UserModule, UserRoutingModule],
  providers: [CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
