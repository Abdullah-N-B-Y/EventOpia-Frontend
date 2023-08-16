import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event_ } from '../../shared/Data/Event_';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PaymentDetailsDTO } from '../../shared/DTO/PaymentDetailsDTO ';
import { Bank } from '../../shared/Data/Bank';

@Component({
    selector: 'app-my-events',
    templateUrl: './my-events.component.html',
    styleUrls: ['./my-events.component.css'],
})
export class MyEventsComponent implements OnInit {
    constructor(
        private eventService: EventService,
        private toastr: ToastrService,
        private paymentService: PaymentService,
        private matDialog: MatDialog
    ) {}

    myEvents: Event_[] = [];
    focusedEvent!: Event_;
    ngOnInit(): void {
        const userIdString: any = localStorage.getItem('UserId');
        if (userIdString) {
            let userId: number = parseInt(userIdString, 10);
            this.eventService.getAllEventsByCreatorId(userId).subscribe(
                (res: Event_[]) => {
                    console.log(res);
                    this.myEvents = res;
                },
                (err) => {
                    console.log('couldnt get all user events ', err);
                }
            );
        }
    }

    payForm: FormGroup = new FormGroup({
        cardNumber: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        cardHolder: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        expirationDate: new FormControl('', [Validators.required]),
        cvv: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]),
    });

    @ViewChild('payDialog') payDialog!: TemplateRef<any>;

    openPayDialog(event: Event_) {
        this.focusedEvent = event;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '500px'; // Set the desired width here
        const dialogRef = this.matDialog.open(this.payDialog, dialogConfig);
        dialogRef.afterClosed().subscribe((result) => {
            if (result != undefined) {
                if (result == 'save') {
                }
            }
        });
    }

    onPaySubmit() {
        const userId: any = localStorage.getItem('UserId');
        let bank: Bank = {
            cardNumber: this.payForm.get('cardNumber')?.value,
            cardHolder: this.payForm.get('cardHolder')?.value,
            expirationDate: this.payForm.get('expirationDate')?.value,
            cvv: this.payForm.get('cvv')?.value.toString(),
        };
        if (!userId || !this.focusedEvent.attendingCost) {
            console.log(userId + ' - ');
            return;
        }
        let paymentDetailsDTO: PaymentDetailsDTO = {
            userId: userId,
            eventId: this.focusedEvent.id,
            paymentAmount: this.focusedEvent.attendingCost,
            bank: bank,
        };
        console.log('new payment: ');
        console.log(paymentDetailsDTO);
        this.paymentService.payForCreateEvent(paymentDetailsDTO).subscribe(
            (res: any) => {
                this.toastr.success('Payment Successful, an invoice was sent to you');
                this.focusedEvent.status = 'paid';
                this.eventService.updateEvent(this.focusedEvent).subscribe(
                    (res) => {
                        console.log('update event has succeeded:', res);
                    },
                    (err) => {
                        console.log('update event error:', err);
                    }
                );
            },
            (err) => {
                console.log('in paymentService - payForRegisterEvent ', err);
                this.toastr.error('Payment failed');
            }
        );
    }

    getDataURL(base64String: string | undefined) {
        return `data:image/png;base64,${base64String}`;
    }
}
