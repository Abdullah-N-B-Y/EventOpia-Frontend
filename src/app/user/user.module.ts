import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EventsComponent } from './events/events.component';
import { MyEventsComponent } from './my-events/my-events.component';


@NgModule({
    declarations: [UserProfileComponent, EventsComponent, MyEventsComponent],
    imports: [CommonModule, SharedModule, UserRoutingModule],
    exports: [UserProfileComponent]
})
export class UserModule {}
