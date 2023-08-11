import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile.service';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/shared/Data/User';
import { Profile } from 'src/app/shared/Data/Profile';
import { UpdatePasswordDTO } from 'src/app/shared/DTO/UpdatePasswordDTO';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user:User = {
    id: 0,
    username:'',
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
  userProfile:Profile={
    id: 1,
    firstName:'',
    profilesettings: []
  };
  email?:string = '';

  token1?:any | string = sessionStorage.getItem('jwtToken');
  decodedToken: User | null = null;
  userId:any | number;

  constructor(public profile:ProfileService, private dailog:MatDialog){ }
  ngOnInit(): void {
    if (this.token1) {
      this.decodedToken = jwt_decode(this.token1) as User;

      if (this.decodedToken) {
        this.userId = this.decodedToken['UserId']; // Use PascalCase here

        this.profile.getUserById(this.userId).subscribe((pUser: User) => {
          this.user = pUser;
          this.email = pUser.email;
        }, err => {
          console.log(err.status);
        });
    
        this.profile.getProfileByUserId(this.userId).subscribe((pProfile: Profile) => {
          this.userProfile = pProfile;
        }, err => {
          console.log(err.status);
        });
      }
    }
  }
  
  passwordForm : FormGroup = new FormGroup({
    oldPassword : new FormControl('',[Validators.required,Validators.minLength(8)]),
    newPassword : new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmPassword : new FormControl('')
  });

  passwordDTO:UpdatePasswordDTO = {
    OldPassword: null,
    NewPassword: null,
    ConfirmPassword: null
  }

  updateProfile(){
    this.profile.updateProfile(this.userProfile);
  }
  changePassword(){
    const token = localStorage.getItem('jwtToken');
    if (this.token1) {
      this.passwordDTO.OldPassword = this.passwordForm.controls['oldPassword'].value;
      this.passwordDTO.NewPassword = this.passwordForm.controls['newPassword'].value;
      this.passwordDTO.ConfirmPassword = this.passwordForm.controls['confirmPassword'].value;
      this.profile.changePassword(this.passwordDTO, this.userId);
    }
  }
  checkReapetedPassword(){
    if(this.passwordForm.controls['newPassword'].value === this.passwordForm.controls['confirmPassword'].value){
      this.passwordForm.controls['confirmPassword'].setErrors(null);
    }
    else{
      this.passwordForm.controls['confirmPassword'].setErrors({misMatch:true});
    }
  }

  @ViewChild('callDeleteDailog') callDelete!:TemplateRef<any>
  openDeleteDailog(){
    const dialogRef= this.dailog.open(this.callDelete);
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
          if(result=='yes')
            console.log("Thank you yes");
          else if (result=='no')
            console.log("Thank you no");  
       }
    })
   }
}