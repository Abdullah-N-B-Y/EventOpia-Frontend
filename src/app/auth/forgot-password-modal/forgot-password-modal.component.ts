import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css'],
})
export class ForgotPasswordModalComponent {
  closeResult: string | undefined;
  email: string = '';
  stageNo: string = '1';
  showValidations: boolean = false;
  emailExists: boolean = true;
  isCodeValid: boolean = true;

  constructor(
    private modalService: NgbModal,
    private userSevice: UserService
  ) {}

  emailForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50),
    ]),
  });

  generateVerificationCode() {
    this.emailExists = true;
    this.showValidations = true;
    if (!this.emailForm.valid) return;

    this.email = this.emailForm.get('email')?.value;
    this.userSevice.forgotPassword(this.email).subscribe(
      () => {
        this.showValidations = false;
        this.stageNo = '2';
      },
      (err) => {
        console.log(err);
        this.emailExists = false;
      }
    );
  }

  codeForm: FormGroup = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.maxLength(36),
      Validators.minLength(36),
    ]),
  });

  checkVerificationCode() {
    this.isCodeValid = true;
    this.showValidations = true;
    if (!this.codeForm.valid) return;

    const code: string = this.codeForm.get('code')?.value;
    this.userSevice.checkPasswordResetToken(this.email, code).subscribe(
      () => {
        this.showValidations = false;
        this.stageNo = '3';
      },
      (err) => {
        console.log(err);
        this.isCodeValid = false;
      }
    );
  }

  private passwordPattern: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

  passwordForm: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordPattern),
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
  });

  resetPassword() {
    this.showValidations = true;
    if (!this.passwordForm.valid) return;

    const password: string = this.passwordForm.get('password')?.value;
    this.userSevice.resetForgottenPassword(this.email, password).subscribe(
      () => {
        this.showValidations = false;
        this.stageNo = '4';
      },
      (err) => {
        console.log(err);
      }
    );
  }

  open(content: any, type: string, modalDimension: string | undefined) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService
        .open(content, { windowClass: 'modal-mini modal-primary', size: 'sm' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else if (modalDimension == undefined && type === 'Login') {
      this.modalService
        .open(content, { windowClass: 'modal-login modal-primary' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    } else {
      this.modalService.open(content).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
