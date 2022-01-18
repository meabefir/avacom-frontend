import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ConnectComponent } from './connect/connect.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileVisitComponent } from './profile-visit/profile-visit.component';

@NgModule({
  declarations: [
    MainPageComponent,
    HomeComponent,
    CreatePostComponent,
    FeedComponent,
    PostComponent,
    ConnectComponent,
    ProfileComponent,
    ProfileVisitComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,

    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ]
})
export class UserModule { }
