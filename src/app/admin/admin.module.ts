import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';


@NgModule({
  declarations: [
    ProfileComponent,
    HomeDashboardComponent,
    ManageEventsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
