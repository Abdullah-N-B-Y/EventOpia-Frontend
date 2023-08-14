import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ReportComponent } from './report/report.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';

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
    path:'manageCategories',
    component: ManageCategoriesComponent
  },
  {
    path: 'report',
    component: ReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
