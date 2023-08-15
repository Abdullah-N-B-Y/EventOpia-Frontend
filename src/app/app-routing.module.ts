import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthModule } from './auth/auth.module';
import { EventsComponent } from './events/events.component';
import { AdminModule } from './admin/admin.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin-guard.guard';
import { MyEventsComponent } from './my-events/my-events.component';


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
    loadChildren: () => AdminModule,
    canActivate: [AdminGuard]
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
    path: 'my-events',
    component: MyEventsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
