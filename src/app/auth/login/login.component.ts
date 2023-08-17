import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { LoginDTO } from 'src/app/shared/DTO/LoginDTO';
import { Profile } from 'src/app/shared/Data/Profile';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    focus: boolean | undefined;
    focus1: boolean | undefined;
    showValidations: boolean = false;
    validCredentials: boolean = true;
    loginSuccess: boolean = false;
    stored_username: string | null = localStorage.getItem('username_Eventopia');
    stored_password: string | null = localStorage.getItem('password_Eventopia');

    constructor(
        private authService: AuthService,
        private router: Router,
        private matDialog: MatDialog,
        private toastr: ToastrService,
        private profileService: ProfileService
    ) {}

    private passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

    loginForm: FormGroup = new FormGroup({
        username: new FormControl(this.stored_username, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        password: new FormControl(this.stored_password, [
            Validators.required,
            Validators.pattern(this.passwordPattern),
            Validators.minLength(8),
            Validators.maxLength(50),
        ]),
        rememberMe: new FormControl(false),
    });

    login(): void {
        this.showValidations = true;
        this.validCredentials = true;
        this.loginSuccess = false;
        if (!this.loginForm.valid) return;

        let loginDTO: LoginDTO = {
            Username: this.loginForm.get('username')?.value,
            Password: this.loginForm.get('password')?.value,
        };

        this.authService.login(loginDTO).subscribe(
            (res: any) => {
                this.validCredentials = true;
                this.loginSuccess = true;
                let decodedToken: any = jwtDecode(res.content);
                let roleId: string = decodedToken['RoleId'];
                let userId: string = decodedToken['UserId'];
                localStorage.setItem('jwtToken', res.content);
                localStorage.setItem('UserId', userId);
                localStorage.setItem('RoleId', roleId);
                localStorage.setItem('Username', decodedToken['Username']);
                console.log('res is here', res.content);
                if (this.loginForm.get('rememberMe')?.value === true) this.rememberMeOn();

                let hasProfile: boolean;
                this.profileService.getProfileByUserId(parseInt(userId, 10)).subscribe((res) => {
                    if (roleId === '1') this.router.navigate(['/admin/statistic']);
                    else if (roleId === '2') this.router.navigate(['']);
                }, err => {
                    if (err.status === 404)
                        this.openAddProfileDialog();
                });
            },
            (err) => {
                this.validCredentials = false;
                console.log(err);
            }
        );
    }

    private rememberMeOn() {
        localStorage.setItem('username_Eventopia', this.loginForm.get('username')?.value);
        localStorage.setItem('password_Eventopia', this.loginForm.get('password')?.value);
    }

    clearRememberMeItems() {
        localStorage.removeItem('username_Eventopia');
        localStorage.removeItem('password_Eventopia');
        this.loginForm.reset();
    }

    navigateToRegister() {
        this.router.navigate(['/auth/register']);
    }

    private phoneNumberPattern: RegExp = /^\+?[0-9]{10,13}$/;
    profileForm: FormGroup = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern(this.phoneNumberPattern)]),
        gender: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        dateOfBirth: new FormControl('', [Validators.required]),
        bio: new FormControl('', [Validators.required, Validators.maxLength(500)]),
        profileImage: new FormControl(null, [Validators.required]),
    });
    newProfileImage: File | undefined;
    @ViewChild('addProfileDialog') addProfileDialog!: TemplateRef<any>;
    dialogRef!: any;
    openAddProfileDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '500px'; // Set the desired width here
        dialogConfig.disableClose = true;
        this.dialogRef = this.matDialog.open(this.addProfileDialog, dialogConfig);
        this.dialogRef.afterClosed().subscribe((result: string | undefined) => {
            if (result != undefined) {
                if (result == 'save') {
                    // this.changePassword();
                }
            }
        });
    }

    onAddProfileSubmit() {
        if (!this.newProfileImage) {
            console.log('no image provided'); //add toastr
            return;
        }

        const userId: string | null = localStorage.getItem('UserId');
        if (!userId) {
            console.log('userId from local storage is null');
            return;
        }
        const newProfile: Profile = {
            firstName: this.profileForm.get('firstName')?.value,
            lastName: this.profileForm.get('lastName')?.value,
            phoneNumber: this.profileForm.get('phoneNumber')?.value,
            gender: this.profileForm.get('gender')?.value,
            dateOfBirth: this.profileForm.get('dateOfBirth')?.value,
            bio: this.profileForm.get('bio')?.value,
            rate: 0,
            userId: parseInt(userId, 10),
            receivedImageFile: this.newProfileImage,
        };
        console.log('new profile: ');
        console.log(newProfile);
        this.profileService.createProfile(newProfile).subscribe(
            (res) => {
                console.log('create profile has succeeded:', res);
                this.dialogRef.close();
                this.toastr.success('Successfully created profile');
            },
            (err) => {
                console.log('create profile error:', err);
                this.toastr.error('create profile has failed');
            }
        );
    }

    onFileChange(event: any): void {
        this.newProfileImage = event.target.files[0];
    }

    continueAsGuest() {
        this.router.navigate(['']);
    }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body?.classList?.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar?.classList?.add('navbar-transparent');
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body?.classList?.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar?.classList?.remove('navbar-transparent');
    }
}
