import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EventsComponent } from './events/events.component';
import { MyEventsComponent } from './my-events/my-events.component';

const routes: Routes = [
    {
        path: 'home',
        component: UserHomeComponent,
    },
    {
        path: 'profile',
        component: UserProfileComponent,
    },
    {
        path: 'events',
        component: EventsComponent,
    },
    {
        path: 'my-events',
        component: MyEventsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
