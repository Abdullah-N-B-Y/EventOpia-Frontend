import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/shared/Data/User';
import { Profile } from 'src/app/shared/Data/Profile';
import { UpdatePasswordDTO } from 'src/app/shared/DTO/UpdatePasswordDTO';
import { SucceededDialogComponent } from 'src/app/shared/dynamic-dialoges/succeeded-dialog/succeeded-dialog.component';
import { FailedDialogComponent } from 'src/app/shared/dynamic-dialoges/failed-dialog/failed-dialog.component';
import { ProfileService } from 'src/app/services/profile.service';
import { profileImagePath } from 'src/constants/constants';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
    @Input() displayTemplate: boolean = true;
    user: User = {
        id: 0,
        username: '',
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
        comments: [],
    };
    userProfile: Profile = {
        id: 1,
        firstName: '',
        profilesettings: [],
    };

    rate: any;
    dateOfBirth: string = '';
    email?: string = '';
    profileImagePath: string = '';

    token1?: any = localStorage.getItem('jwtToken');
    decodedToken: User | null = null;
    userId: any | number;

    constructor(public profileService: ProfileService, private dialog: MatDialog) {}
    ngOnInit(): void {
        if (this.token1) {
            this.decodedToken = jwt_decode(this.token1);
            if (this.decodedToken) {
                this.userId = this.decodedToken['UserId']; // Use PascalCase here
                this.profileService.getUserById(this.userId).subscribe(
                    (pUser: User) => {
                        this.user = pUser;
                        this.email = pUser.email;
                        this.profileService.getProfileByUserId(this.userId).subscribe(
                            (pProfile: Profile) => {
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
                                        console.log('Invalid date format.');
                                    }
                                }
                                this.profileImagePath = profileImagePath;
                            },
                            (err) => {
                                console.log(err.status);
                            }
                        );
                    },
                    (err) => {
                        console.log(err.status);
                    }
                );
            }
        }
    }

    passwordForm: FormGroup = new FormGroup({
        oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl(''),
    });

    passwordDTO: UpdatePasswordDTO = {
        OldPassword: null,
        NewPassword: null,
        ConfirmPassword: null,
    };

    updateProfile() {
        this.userProfile.receivedImageFile = this.file;
        console.log('before sending update request');
        console.log(this.userProfile);
        this.profileService.updateProfile(this.userProfile).subscribe((success: boolean) => {
            if (success) {
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
        });
    }
    changePassword() {
        if (this.token1) {
            this.passwordDTO.OldPassword = this.passwordForm.controls['oldPassword'].value;
            this.passwordDTO.NewPassword = this.passwordForm.controls['newPassword'].value;
            this.passwordDTO.ConfirmPassword = this.passwordForm.controls['confirmPassword'].value;
            this.profileService.changePassword(this.passwordDTO, this.userId).subscribe((success: boolean) => {
                if (success) {
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
            });
        }
    }

    checkReapetedPassword() {
        if (this.passwordForm.controls['newPassword'].value === this.passwordForm.controls['confirmPassword'].value) {
            this.passwordForm.controls['confirmPassword'].setErrors(null);
        } else {
            this.passwordForm.controls['confirmPassword'].setErrors({ misMatch: true });
        }
    }

    @ViewChild('changePasswordDailog') changePasswordDailog!: TemplateRef<any>;
    openChangePasswordDailog() {
        const dialogRef = this.dialog.open(this.changePasswordDailog);
        dialogRef.afterClosed().subscribe((result: string | undefined) => {
            if (result != undefined) {
                if (result == 'save') {
                    //this.changePassword();
                }
            }
        });
    }

    getStarArray(): number[] {
        return Array.from({ length: 5 }, (_, i) => i);
    }

    file: any;
    handleFileInput(e: any) {
        this.file = e.target.files[0];
    }

    getDataURL(base64String: string | undefined): string {
        return `data:image/png;base64,${base64String}`;
    }
}
