import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
    constructor(private router: Router) {}
    @Input() activeItem: string = 'statistic';
    openDashboard() {
        this.router.navigate(['admin/statistic']);
    }
    openManageCategories() {
        this.router.navigate(['admin/manageCategories']);
    }
    openAcceptEvents() {
        this.router.navigate(['admin/EventAcceptance']);
    }
    manageUsers() {
        this.router.navigate(['admin/manageUsers']);
    }
    openReports() {
        this.router.navigate(['admin/report']);
    }
    openManagePages() {
        this.router.navigate(['admin/managePages']);
    }
    openSearchEvents() {
        this.router.navigate(['admin/search-events']);
    }
    openContactEntries() {
        this.router.navigate(['admin/contact-entries']);
    }
    logout() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('UserId');
        localStorage.removeItem('Username');
        localStorage.removeItem('RoleId');
        this.router.navigate(['auth/login']);
    }
}
