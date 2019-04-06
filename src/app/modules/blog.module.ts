import { NgModule } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';
import { CommonComponentsModule } from './common-components.module';
import { CommonModule } from '@angular/common';
import { MyblogsComponent } from '../components/myblogs/myblogs.component';
import { NewBlogComponent } from '../components/new-blog/new-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { BlogComponent } from '../components/blog/blog.component';

@NgModule({
  declarations: [HomeComponent, MyblogsComponent, NewBlogComponent, BlogComponent],
  imports: [CommonModule, CommonComponentsModule, FormsModule, ReactiveFormsModule, FileUploadModule]
})
export class BlogModule { }
