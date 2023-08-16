import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReportComponent } from './report/report.component';
import { NgChartsModule } from 'ng2-charts';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AcceptEventComponent } from './accept-event/accept-event.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

@NgModule({
  declarations: [
    
    ProfileComponent,
    HomeDashboardComponent,
    StatisticsComponent,
    ReportComponent,
    ManageCategoriesComponent,
    ManageUsersComponent,
    AcceptEventComponent
  ],
    ManageEventsComponent,
    StatisticsComponent,
    ReportComponent,
    TestimonialComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule,
    NgChartsModule,
  ],
})
export class AdminModule {}
