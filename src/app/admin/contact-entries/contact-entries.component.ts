import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { ContactUsEntry } from 'src/app/shared/Data/ContactUsEntry';

@Component({
    selector: 'app-contact-entries',
    templateUrl: './contact-entries.component.html',
    styleUrls: ['./contact-entries.component.css'],
})
export class ContactEntriesComponent implements OnInit {
    constructor(private contactUsService: ContactUsService) {}
  ngOnInit(): void {
    this.contactUsService.getAllContactUsEntries().subscribe(
      (res: ContactUsEntry[]) => {
        this.contacts = res;
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

    contacts: ContactUsEntry[] = [];
}
