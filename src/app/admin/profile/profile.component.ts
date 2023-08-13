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

  rate:any;
  dateOfBirth:string='';
  email?:string = '';

  token1?:any | string = localStorage.getItem('jwtToken');
  decodedToken: User | null = null;
  userId:any | number;

  constructor(public profile:ProfileService, private dialog:MatDialog){ }
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
          
          this.rate = pProfile.rate;
          if (this.userProfile && this.userProfile.dateOfBirth) {
            const parsedDate = new Date(this.userProfile.dateOfBirth);
            
            if (!isNaN(parsedDate.getTime())) {
                const year = parsedDate.getFullYear();
                const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
                const day = parsedDate.getDate().toString().padStart(2, '0');
        
                const formattedDate = `${year}-${month}-${day}`;
                this.dateOfBirth = formattedDate;
            } else {
                console.log("Invalid date format.");
            }
          }
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
    this.profile.updateProfile(this.userProfile).subscribe((success: boolean) => {
      console.log('here 1');
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
  
  changePassword(){
    const token = localStorage.getItem('jwtToken');
    if (this.token1) {
      this.passwordDTO.OldPassword = this.passwordForm.controls['oldPassword'].value;
      this.passwordDTO.NewPassword = this.passwordForm.controls['newPassword'].value;
      this.passwordDTO.ConfirmPassword = this.passwordForm.controls['confirmPassword'].value;
      this.profile.changePassword(this.passwordDTO, this.userId).subscribe((success: boolean) => {
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
    dialogRef.afterClosed().subscribe((result)=>{
       if(result!=undefined)
       {
          if(result=='save'){
            this.changePassword();
          }
       }
    })
   }
 

   getStarArray(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }

}