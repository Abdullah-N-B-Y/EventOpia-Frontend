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


@NgModule({
  declarations: [
    ProfileComponent,
    HomeDashboardComponent,
    StatisticsComponent,
    ReportComponent,
    ManageCategoriesComponent
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
