import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AuthGuard } from '../services/auth.guard';
import { MyblogsComponent } from '../components/myblogs/myblogs.component';
import { NewBlogComponent } from '../components/new-blog/new-blog.component';
import { BlogComponent } from '../components/blog/blog.component';

const routes : Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myblogs',
    component: MyblogsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-blog',
    component: NewBlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'blog/:blogId',
    component: BlogComponent,
    canActivate: [AuthGuard]
  }
] 

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
