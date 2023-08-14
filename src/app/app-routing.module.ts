import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthModule } from './auth/auth.module';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutUsComponent,
  },
  {
    path: 'admin',
    loadChildren: () => DashboardModule,
  },
  {
    path: 'admin/profile',
    component: ProfileComponent,
  },
  {
    path: 'contact',
    component: ContactUsComponent,
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule,
  },
  {
    path: 'events',
    component: EventsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
