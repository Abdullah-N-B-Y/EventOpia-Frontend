import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(public profile:ProfileService, private dailog:MatDialog){}

  profileForm: FormGroup = new FormGroup({
    email : new FormControl('info@example.com',Validators.email),
    firstName :new FormControl('First name'),
    lastName :new FormControl('Last name'),
    phoneNumber :new FormControl('+962 7********'),
    dateOfBirth :new FormControl('DD/MM/YYYY'),
    gender : new FormControl('Male'),
    bio : new FormControl('loruem ipusom')
  });

  updateProfile(){
    this.profile.updateProfile(this.profileForm);
  }
  changePassword(){
    //this.profile.changePassword()
  }


  // @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  // openDeleteDailog(){
  //   const dialogRef= this.dailog.open(this.callDelete);
  //   dialogRef.afterClosed().subscribe((result)=>{
  //      if(result!=undefined)
  //      {
  //         if(result=='yes')
  //           console.log("Thank you yes");
  //         else if (result=='no')
  //           console.log("Thank you no");  
  //      }
  //   })
  //  }
   

}
