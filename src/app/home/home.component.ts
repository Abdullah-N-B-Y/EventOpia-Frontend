import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { Page } from '../shared/Data/Page';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    constructor(private homePage: PageService) {}
    page: Page = {
      id: 1,
      retrievedImageFile: ''
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
    }

    getDataURL(base64String: string): string {
        return `data:image/png;base64,${base64String}`;
    }
}
