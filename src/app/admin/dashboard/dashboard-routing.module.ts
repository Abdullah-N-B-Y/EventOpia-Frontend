import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { ReportComponent } from '../report/report.component';

const routes: Routes = [
  {
    path:'',
    component: HomeDashboardComponent
  },
  {
    path:'statistics',
    component: StatisticsComponent
  },
  {
    path:'report',
    component: ReportComponent
  },
];
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
