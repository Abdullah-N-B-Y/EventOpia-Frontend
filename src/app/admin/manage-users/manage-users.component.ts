import { Component,OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
    constructor(public userService: UserService, private adminService: AdminService) {}
    ngOnInit(): void {
        this.userService.GetAllRegisteredUsersDetails();
    }

    banUser(username: string) {
        this.adminService.banUser(username);
    }
    unbanUser(username: string) {
        this.adminService.unbanUser(username);
    }

    getDataURL(base64String: string): string {
        return `data:image/png;base64,${base64String}`;
    }
}
