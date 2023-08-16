import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Page } from 'src/app/shared/Data/Page';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit{
  //This is a first page or home page with id = 1

  constructor(private homePage: PageService){}
  page: Page = {
    id: 1,
    retrievedImageFile: ''
  };
  ngOnInit(): void {
    this.homePage.getPageById(1).subscribe(
      (res)=>{
        this.page = res;
      },(err)=>{
        console.log(`err=> ${err.message}`)
      }
    );
  }   
}
