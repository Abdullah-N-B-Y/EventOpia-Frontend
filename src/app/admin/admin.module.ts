import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReportComponent } from './report/report.component';
import { NgChartsModule } from 'ng2-charts';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [ProfileComponent,
    HomeDashboardComponent,
    ManageEventsComponent, StatisticsComponent, ReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    NgChartsModule,
  ],
})
export class AdminModule {}
