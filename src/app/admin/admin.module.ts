import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { FormsModule } from '@angular/forms';
import { ReportComponent } from './report/report.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ProfileComponent, StatisticsComponent, ReportComponent],
  imports: [
    CommonModule,
    DashboardModule,
    SharedModule,
    FormsModule,
    NgChartsModule,
  ],
})
export class AdminModule {}
