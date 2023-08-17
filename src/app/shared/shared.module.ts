import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DynamicDialogesModule } from './dynamic-dialoges/dynamic-dialoges.module';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { FooterComponent } from './footer/footer.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [NavbarComponent, FooterComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatInputModule, DynamicDialogesModule, GoogleMapsModule],
    exports: [
        NavbarComponent,
        FooterComponent,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        HttpClientModule,
        DynamicDialogesModule,
        GoogleMapsModule,
        NgChartsModule,
    ],
})
export class SharedModule {}
