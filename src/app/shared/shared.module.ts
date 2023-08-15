import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DynamicDialogesModule } from './dynamic-dialoges/dynamic-dialoges.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [NavbarComponent, FooterComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule,
        DynamicDialogesModule,
    ],
    exports: [
        NavbarComponent,
        FooterComponent,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        HttpClientModule,
        DynamicDialogesModule,
    ],
})
export class SharedModule {}
