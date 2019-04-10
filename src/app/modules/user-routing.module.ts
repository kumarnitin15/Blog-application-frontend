import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import { AuthGuard } from '../services/auth.guard';
import { FollowersComponent } from '../components/followers/followers.component';
import { FollowingComponent } from '../components/following/following.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ChangeProfilePicComponent } from '../components/change-profile-pic/change-profile-pic.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { PhotosComponent } from '../components/photos/photos.component';
import { BookmarkedBlogsComponent } from '../components/bookmarked-blogs/bookmarked-blogs.component';

const routes: Routes = [
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'followers',
    component: FollowersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'following',
    component: FollowingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:userId',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-profile-pic',
    component: ChangeProfilePicComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'photos',
    component: PhotosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bookmarks',
    component: BookmarkedBlogsComponent,
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
export class UserRoutingModule { }
