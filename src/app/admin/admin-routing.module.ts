import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ReportComponent } from './report/report.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AcceptEventComponent } from './accept-event/accept-event.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { SearchEventsComponent } from './search-events/search-events.component';
import { ManagePageComponent } from './manage-page/manage-page.component';
import { TestimonialStatusComponent } from './testimonial-status/testimonial-status.component';
import { ContactEntriesComponent } from './contact-entries/contact-entries.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'home',
    component: HomeDashboardComponent,
  },
  // {
  //   path: 'manageevents',
  //   component: manageeventscomponent,
  // },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
  { path: 'report', component: ReportComponent },
  {
    path: 'manageCategories',
    component: ManageCategoriesComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
  },
  {
    path: 'statistic',
    component: StatisticsComponent,
  },
  {
    path: 'manageUsers',
    component: ManageUsersComponent,
  },
  {
    path: 'EventAcceptance',
    component: AcceptEventComponent,
  },
  {
    path: 'search-events',
    component: SearchEventsComponent,
  },
  {
    path: 'managePages',
    component: ManagePageComponent,
  },
  {
    path: 'testimonialStatus',
    component: TestimonialStatusComponent,
  },
  {
    path: 'contact-entries',
    component: ContactEntriesComponent,
},
{
    path: 'testimonial',
    component: TestimonialComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
