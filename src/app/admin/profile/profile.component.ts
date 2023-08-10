import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile.service';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/shared/Data/User';
import { Profile } from 'src/app/shared/Data/Profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  constructor(public profile:ProfileService, private dailog:MatDialog){}
  
  user:User = {
    id: 1,
    username: 'test',
    password: 'test password',
    email: 'asd',
    verificationCode: 'asd',
    userStatus: 'asd',
    bookings: [],
    categories: [],
    contactUsEntries: [],
    events: [],
    messageReceivers: [],
    messageSenders: [],
    notifications: [],
    pages: [],
    profiles: [],
    role: null,
    testimonials: [],
    comments: []
  };

  userProfile:Profile = {
    id: 0,
    firstName:'test',
    lastName:'test',
    profilesettings: []
  };

  ngOnInit(): void {
    this.profile.getUserById(1).subscribe((resp:any)=>{
      this.user = resp;
      console.log('111111111111123'+this.user.email);
    },err=>{
      console.log(err);
    })
  }

  test(){
    this.profile.getUserById(1).subscribe((resp:any)=>{
      this.user = resp;
      console.log('111111111111123'+this.user.email);
    },err=>{
      console.log(err);
    })
  }

  profileForm: FormGroup = new FormGroup({
    email : new FormControl(this.user.email,Validators.email),
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

