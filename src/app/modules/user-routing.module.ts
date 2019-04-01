import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import { AuthGuard } from '../services/auth.guard';
import { FollowersComponent } from '../components/followers/followers.component';
import { FollowingComponent } from '../components/following/following.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';

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
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
