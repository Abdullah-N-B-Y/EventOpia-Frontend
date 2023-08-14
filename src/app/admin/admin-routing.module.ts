import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';

const routes: Routes = [
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path: 'home',
    component:HomeDashboardComponent
  },
  {
    path:'manageevents',
    component: ManageEventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
