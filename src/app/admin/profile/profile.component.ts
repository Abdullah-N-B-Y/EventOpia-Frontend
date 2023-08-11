import { Component, OnInit} from '@angular/core';
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

  constructor(public profile:ProfileService, private dailog:MatDialog){ }
  ngOnInit(): void {

  if (this.token1) {
    this.decodedToken = jwt_decode(this.token1) as User;

    if (this.decodedToken) {
      const userId = this.decodedToken['UserId']; // Use PascalCase here

      this.profile.getUserById(userId).subscribe((pUser: User) => {
        this.user = pUser;
        this.email = pUser.email;
      }, err => {
        console.log(err.status);
      });
  
      this.profile.getProfileByUserId(userId).subscribe((pProfile: Profile) => {
        this.userProfile = pProfile;
      }, err => {
        console.log(err.status);
      });
    }
  }
  
    
  }
  
  passwordForm: FormGroup = new FormGroup({
    oldPassowrd: new FormControl('********',Validators.minLength(8)),
    newPassword: new FormControl('********',Validators.minLength(8)),
    confirmPassword: new FormControl(),
  })
  
  updateProfile(){
    this.profile.updateProfile(this.userProfile);
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

