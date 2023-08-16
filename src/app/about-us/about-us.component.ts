import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';
import { Page } from '../shared/Data/Page';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit{
  //This is a second page or about-us page with id = 2

  constructor(private aboutPage: PageService){}
  page: Page = {
    id: 2
  };
  ngOnInit(): void {
    this.aboutPage.getPageById(2).subscribe(
      (res)=>{
        this.page = res;
      },(err)=>{
        console.log(`err=> ${err.message}`)
      }
    );
  }   
}
