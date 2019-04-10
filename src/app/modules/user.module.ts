import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from '../components/people/people.component';
import { CommonComponentsModule } from './common-components.module';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { FollowingComponent } from '../components/following/following.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ChangeProfilePicComponent } from '../components/change-profile-pic/change-profile-pic.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotosComponent } from '../components/photos/photos.component';
import { ProfileBlogsComponent } from '../components/profile-blogs/profile-blogs.component';
import { ProfileFollowersComponent } from '../components/profile-followers/profile-followers.component';
import { ProfileFollowingComponent } from '../components/profile-following/profile-following.component';
import { BookmarkedBlogsComponent } from '../components/bookmarked-blogs/bookmarked-blogs.component';

@NgModule({
  declarations: [PeopleComponent, NotificationsComponent, FollowersComponent, FollowingComponent, ProfileComponent, ChangeProfilePicComponent, ChangePasswordComponent, PhotosComponent, ProfileBlogsComponent, ProfileFollowersComponent, ProfileFollowingComponent, BookmarkedBlogsComponent],
  imports: [CommonModule, CommonComponentsModule, FileUploadModule, FormsModule, ReactiveFormsModule]
})
export class UserModule { }
