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
import { SearchEventsComponent } from './search-events/search-events.component';
import { ManagePageComponent } from './manage-page/manage-page.component';
import { TestimonialStatusComponent } from './testimonial-status/testimonial-status.component';
import { ContactEntriesComponent } from './contact-entries/contact-entries.component';
import { UserModule } from '../user/user.module';

@NgModule({
    declarations: [
        ProfileComponent,
        HomeDashboardComponent,
        StatisticsComponent,
        ReportComponent,
        ManageCategoriesComponent,
        ManageUsersComponent,
        AcceptEventComponent,
        StatisticsComponent,
        ReportComponent,
        SearchEventsComponent,
        ManagePageComponent,
        TestimonialStatusComponent,
        ContactEntriesComponent,
        SearchEventsComponent,
        ManagePageComponent,
        TestimonialStatusComponent,
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, AdminRoutingModule, NgChartsModule, UserModule],
})
export class AdminModule {}
