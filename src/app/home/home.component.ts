import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { Page } from '../shared/Data/Page';
import { TestimonialService } from '../services/testimonial.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    approvedTestimonials: any[] = [];

    constructor(private homePage: PageService, private testimonialService: TestimonialService) {}
    page: Page = {
        id: 1,
        retrievedImageFile: '',
    };
    ngOnInit(): void {
        this.homePage.getPageById(1).subscribe(
            (res) => {
                this.page = res;
            },
            (err) => {
                console.log(`err=> ${err.message}`);
            }
        );
        this.fetchTestimonials();
    }

    fetchTestimonials(): void {
        this.testimonialService.GetAllTestimonials().subscribe(
            (response: any[]) => {
                this.approvedTestimonials = response.filter((t) => t.status === 'Approved');
            },
            (error) => {
                console.error('Error fetching testimonials:', error);
            }
        );
    }

    getDataURL(base64String: string): string {
        return `data:image/png;base64,${base64String}`;
    }
}
