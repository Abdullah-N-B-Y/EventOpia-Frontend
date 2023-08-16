import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
    constructor(private router: Router) {}
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
}
