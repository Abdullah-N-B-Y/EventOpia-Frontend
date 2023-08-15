import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthModule } from './auth/auth.module';
import { EventSearchComponent } from './event-search/event-search.component';
import { EventsComponent } from './events/events.component';
import { AdminModule } from './admin/admin.module';
import { ProfileComponent } from './admin/profile/profile.component';

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
    path: 'contact',
    component: ContactUsComponent,
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule,
  },

  
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'search',
    component: EventSearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
