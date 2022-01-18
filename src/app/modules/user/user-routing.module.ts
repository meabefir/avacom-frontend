import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ProfileVisitComponent } from './profile-visit/profile-visit.component';

const routes: Routes = [
  { path: '', 
    component: MainPageComponent
  },
  { path: 'profile/:username', component: ProfileVisitComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
