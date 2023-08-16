import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { EventsComponent } from './user/events/events.component';
import { AdminModule } from './admin/admin.module';
import { MyEventsComponent } from './user/my-events/my-events.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, AboutUsComponent, ContactUsComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        SharedModule,
        HttpClientModule,
        BrowserAnimationsModule,
        GoogleMapsModule,
        ToastrModule.forRoot(),
        ToastNoAnimationModule.forRoot(),
        MatDialogModule,
        AdminModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
