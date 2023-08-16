import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
    constructor(private router: Router) {}
    token?: any = localStorage.getItem('jwtToken');
    roleId?: any = localStorage.getItem('UserId');
    openProfile() {
        this.token == null
            ? this.router.navigate(['auth/login'])
            : this.roleId === '1'
            ? this.router.navigate(['admin/profile'])
            : this.router.navigate(['user/profile']);
    }

    openHome() {
        this.router.navigate(['']);
    }

    openAbout() {
        this.router.navigate(['about']);
    }

    openTestimonial() {
        this.router.navigate(['testimonial']);
    }

    openContact() {
        this.router.navigate(['contact']);
    }

    openEvents() {
        this.router.navigate(['user/events']);
    }

    openMyEvents() {
        this.router.navigate(['user/my-events']);
    }

    logout() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('UserId');
        localStorage.removeItem('Username');
        localStorage.removeItem('RoleId');
        this.router.navigate(['auth/login']);
    }
}
