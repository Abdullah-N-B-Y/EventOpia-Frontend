import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from '../services/contact-us.service';
import { MatDialog } from '@angular/material/dialog';
import { SucceededDialogComponent } from '../shared/dynamic-dialoges/succeeded-dialog/succeeded-dialog.component';
import { FailedDialogComponent } from '../shared/dynamic-dialoges/failed-dialog/failed-dialog.component';
import { ContactUsEntry } from '../shared/Data/ContactUsEntry';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  constructor(private contactUs: ContactUsService, private dialog:MatDialog){}
  contactUsForm: FormGroup = new FormGroup({
    email : new FormControl('',Validators.required),
    phoneNumber : new FormControl(''),
    subject : new FormControl(''),
    message : new FormControl('',Validators.required)
  })

  sendMessage(){
    this.contactUs.createContactUs(this.contactUsForm).subscribe((success: boolean) => {
      if(success)
      {
        const dialogRef = this.dialog.open(SucceededDialogComponent);
        setTimeout(() => {
          dialogRef.close();
        }, 3000);
      }
      else
      {
        const dialogRef = this.dialog.open(FailedDialogComponent);
        setTimeout(() => {
          dialogRef.close();
        }, 3000);
      }
    });;
  }
  
}
