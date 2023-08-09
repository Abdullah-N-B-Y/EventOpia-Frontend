import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile.service';
import jwt_decode from 'jwt-decode';


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

  passwordForm: FormGroup = new FormGroup({
    oldPassowrd: new FormControl('********',Validators.minLength(8)),
    newPassword: new FormControl('********',Validators.minLength(8)),
    confirmPassword: new FormControl(),
  })
  updateProfile(){
    this.profile.updateProfile(this.profileForm);
  }
  changePassword(){
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const userId: string = decodedToken.sub;
      this.profile.changePassword(parseInt(userId),this.passwordForm);
    }
  }

  confirmPassword(){
    if(this.passwordForm.controls['newPassword'].value == this.passwordForm.controls['confirmPassword'].value){
      this.passwordForm.controls['confirmPassword'].setErrors(null);
    }
    else{
      this.passwordForm.controls['confirmPassword'].setErrors({misMatch:true});
    }
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
