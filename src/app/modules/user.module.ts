import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from '../components/people/people.component';
import { CommonComponentsModule } from './common-components.module';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { FollowingComponent } from '../components/following/following.component';

@NgModule({
  declarations: [PeopleComponent, NotificationsComponent, FollowersComponent, FollowingComponent],
  imports: [CommonModule, CommonComponentsModule]
})
export class UserModule { }
