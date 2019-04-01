import { NgModule } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';
import { CommonComponentsModule } from './common-components.module';
import { CommonModule } from '@angular/common';
import { MyblogsComponent } from '../components/myblogs/myblogs.component';
import { NewBlogComponent } from '../components/new-blog/new-blog.component';

@NgModule({
  declarations: [HomeComponent, MyblogsComponent, NewBlogComponent],
  imports: [CommonModule, CommonComponentsModule]
})
export class BlogModule { }
