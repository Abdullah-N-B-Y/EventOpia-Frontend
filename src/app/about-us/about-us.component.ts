import { Component, Input, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { Page } from '../shared/Data/Page';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
    //This is a second page or about-us page with id = 2
    @Input() displayTemplate: boolean = true;
    constructor(private aboutPage: PageService) {}
    page: Page = {
        id: 2,
        retrievedImageFile: '',
    };
    ngOnInit(): void {
        this.aboutPage.getPageById(2).subscribe(
            (res) => {
                this.page = res;
            },
            (err) => {
                console.log(`err=> ${err.message}`);
            }
        );
    }

    getDataURL(base64String: string): string {
        return `data:image/png;base64,${base64String}`;
    }
}
