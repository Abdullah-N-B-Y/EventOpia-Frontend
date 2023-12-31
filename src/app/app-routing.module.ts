import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin-guard.guard';
import { UserModule } from './user/user.module';
import { UserGuard } from './user-guard.guard';
import { EventsComponent } from './user/events/events.component';
import { MyEventsComponent } from './user/my-events/my-events.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

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
        canActivate: [AdminGuard],
    },
    {
        path: 'auth',
        loadChildren: () => AuthModule,
    },
    {
        path: 'events',
        component: EventsComponent,
    },
    {
        path: 'my-events',
        component: MyEventsComponent,
    },
    {
        path: 'user',
        loadChildren: () => UserModule,
        canActivate: [UserGuard],
    },
    {
        path: 'testimonial',
        component: TestimonialComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
