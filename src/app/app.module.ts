import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventsComponent } from './events/events.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { EventSearchComponent } from './event-search/event-search.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, AboutUsComponent, ContactUsComponent, EventsComponent,EventSearchComponent],
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
        AdminModule,
        MatDialogModule,
        ReactiveFormsModule
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
