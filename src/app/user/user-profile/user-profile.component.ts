import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/shared/Data/User';
import { Profile } from 'src/app/shared/Data/Profile';
import { UpdatePasswordDTO } from 'src/app/shared/DTO/UpdatePasswordDTO';
import { SucceededDialogComponent } from 'src/app/shared/dynamic-dialoges/succeeded-dialog/succeeded-dialog.component';
import { FailedDialogComponent } from 'src/app/shared/dynamic-dialoges/failed-dialog/failed-dialog.component';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  
  token?:any | string = localStorage.getItem('jwtToken');
  decodedToken: User | null = null;
  userId:any | number;

  rate:any;
  dateOfBirth:any;

  user:User={
    id: 0,
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
  }
  profile:Profile={
    id: 0
  }
  
  profileForm:FormGroup= new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    phoneNumber: new FormControl('',Validators.required),
    bio: new FormControl('',Validators.required),
  })

  constructor(public profileService:ProfileService, private dialog:MatDialog){ }
  ngOnInit(): void {
    if(this.token){
      this.decodedToken = jwt_decode(this.token);
      if (this.decodedToken) {
        this.userId = this.decodedToken['UserId'];
        this.profileService.getUserById(this.userId).subscribe((res)=>{
          this.user = res;
        },(err)=>{
          console.log('err gitting user by user id => '+err.messageReceivers);
        });
        this.profileService.getProfileByUserId(this.userId).subscribe((res)=>{
          this.profile = res;
          this.rate = this.profile.rate;
          this.dateOfBirth = this.profile.dateOfBirth;
          if(this.profile) {
            this.profileForm.patchValue({
              firstName: this.profile.firstName,
              lastName: this.profile.lastName,
              phoneNumber: this.profile.phoneNumber,
              bio: this.profile.bio
            });
          }
        },(err)=>{
          console.log('err gitting user by user id => '+err.messageReceivers);
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
   if(this.profileForm){
      this.profile.firstName = this.profileForm.controls['firstName'].value;
      this.profile.lastName = this.profileForm.controls['lastName'].value;
      this.profile.phoneNumber = this.profileForm.controls['phoneNumber'].value;
      this.profile.bio = this.profileForm.controls['bio'].value;

      console.log('This in update profile this.profile');
      console.log(this.profile);

      this.profileService.updateProfile(this.profile).subscribe((res:boolean)=>{
        if (res) {
          const dialogRef = this.dialog.open(SucceededDialogComponent);
          setTimeout(() => {
              dialogRef.close();
          }, 3000);
      } else {
          const dialogRef = this.dialog.open(FailedDialogComponent);
          setTimeout(() => {
              dialogRef.close();
          }, 3000);
      }
      },(err)=>{

      })
   }
}
  changePassword(){
    const token = localStorage.getItem('jwtToken');
    if (this.token) {
      this.passwordDTO.OldPassword = this.passwordForm.controls['oldPassword'].value;
      this.passwordDTO.NewPassword = this.passwordForm.controls['newPassword'].value;
      this.passwordDTO.ConfirmPassword = this.passwordForm.controls['confirmPassword'].value;
      this.profileService.changePassword(this.passwordDTO, this.userId).subscribe((success: boolean) => {
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
      });
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

  @ViewChild('changePasswordDailog') changePasswordDailog!:TemplateRef<any>
  openChangePasswordDailog(){
    const dialogRef= this.dialog.open(this.changePasswordDailog);
    dialogRef.afterClosed().subscribe((result: string | undefined)=>{
       if(result!=undefined)
       {
          if(result=='save'){
            //this.changePassword();
          }
       }
    })
   }
 
   getStarArray(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }

  selectedImage: File | undefined;
  onFileChange(event: any): void {
    this.selectedImage = event.target.files[0];
  }

}
