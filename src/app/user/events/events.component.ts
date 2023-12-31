import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { EventService } from '../../services/event.service';
import { EventWithDetailsDTO } from '../../shared/DTO/EventWithDetailsDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../shared/Data/Category';
import { Event_ } from '../../shared/Data/Event_';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Bank } from '../../shared/Data/Bank';
import { PaymentDetailsDTO } from '../../shared/DTO/PaymentDetailsDTO ';
import { PaymentService } from '../../services/payment.service';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../shared/Data/Booking';

interface eventOnMap {
    event: EventWithDetailsDTO;
    markerPosition: google.maps.LatLngLiteral;
}

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
    isAddingEvent: boolean = false;
    events: EventWithDetailsDTO[] = [];
    lat: number = 31.1;
    lng: number = 35.9284;
    display: any;
    center: google.maps.LatLngLiteral = {
        lat: this.lat,
        lng: this.lng,
    };
    zoom = 8;
    eventsOnMap: eventOnMap[] = [];
    focusedEvent: EventWithDetailsDTO = {
        id: 0,
        name: 'Dummy Event',
        attendingCost: 0,
        startDate: new Date(),
        endDate: new Date(),
        status: 'Upcoming',
        eventDescription: 'This is a dummy event description.',
        imagePath: 'dummy-image.jpg',
        eventCapacity: 100,
        latitude: 0,
        longitude: 0,
        address: 'dummy address',
        eventCreatorId: 1,
        categoryId: 1,
        retrievedImageFile: 'dummy-image-data',
        categoryName: 'General',
        creatorName: 'John Doe',
    };

    constructor(
        private eventService: EventService,
        private matDialog: MatDialog,
        private categoryService: CategoryService,
        private toastr: ToastrService,
        private paymentService: PaymentService,
        private bookingService: BookingService
    ) {}

    ngOnInit(): void {
        this.eventService.getAllActiveEventsWithDetails().subscribe(
            (eventList: EventWithDetailsDTO[]) => {
                console.log('eventList form backend');
                console.log(eventList);
                this.events = eventList;
                this.updateEventsOnMap();
            },
            (err) => {
                console.log(err);
            }
        );
    }

    @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

    openInfoWindow(marker: MapMarker, eventData: EventWithDetailsDTO) {
        console.log('in openInfoWindow: eventId= ' + eventData.id);
        if (this.infoWindow && marker) {
            this.infoWindow.open(marker);
            this.infoWindow.options = { maxWidth: 400 };
        }
        this.focusedEvent = eventData;
        this.infoWindow?.open(marker);
    }

    moveMap(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.center = event.latLng.toJSON();
    }
    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }
    addEvent(event: google.maps.MapMouseEvent) {
        if (event == null || event.latLng == null) return;
        this.newEventCoords = event.latLng;
        this.openAddEventDialog();
    }

    getDataURL(base64String: string) {
        return `data:image/png;base64,${base64String}`;
    }

    eventForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        attendingCost: new FormControl('', [Validators.required, Validators.min(0)]),
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required),
        eventDescription: new FormControl('', [Validators.required, Validators.maxLength(500)]),
        eventCapacity: new FormControl('', [Validators.required, Validators.min(0)]),
        address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        categoryId: new FormControl('', [Validators.required, Validators.min(1)]),
        eventImage: new FormControl(null, [Validators.required]),
    });
    newEventCoords!: google.maps.LatLng;
    newEventImage: File | undefined;
    @ViewChild('addEventDialog') addEventDialog!: TemplateRef<any>;

    openAddEventDialog() {
        this.getAllCategories();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '500px'; // Set the desired width here
        const dialogRef = this.matDialog.open(this.addEventDialog, dialogConfig);
        dialogRef.afterClosed().subscribe((result) => {
            if (result != undefined) {
                if (result == 'save') {
                    // this.changePassword();
                }
            }
        });
    }

    onAddEventSubmit() {
        if (!this.newEventImage) {
            console.log('no image provided'); //add toastr
            return;
        }
        const token: any = localStorage.getItem('jwtToken');
        const decodedToken: any = jwt_decode(token);
        const userId: string = decodedToken['UserId'];
        let newEvent: Event_ = {
            name: this.eventForm.get('name')?.value,
            attendingCost: this.eventForm.get('attendingCost')?.value,
            startDate: this.eventForm.get('startDate')?.value,
            endDate: this.eventForm.get('endDate')?.value,
            status: 'pending',
            eventDescription: this.eventForm.get('eventDescription')?.value,
            eventCapacity: this.eventForm.get('eventCapacity')?.value,
            latitude: this.newEventCoords.lat(),
            longitude: this.newEventCoords.lng(),
            address: this.eventForm.get('address')?.value,
            eventCreatorId: parseInt(userId, 10),
            categoryId: this.eventForm.get('categoryId')?.value,
            receivedImageFile: this.newEventImage,
        };
        console.log('new event: ');
        console.log(newEvent);
        this.eventService.createEvent(newEvent).subscribe(
            (res) => {
                console.log('create event has succeeded:', res);
                this.toastr.success('Successfully created event');
            },
            (err) => {
                console.log('create event error:', err);
                this.toastr.error('create event has failed');
            }
        );
        this.isAddingEvent = false;
    }
    enterAddMode() {
        this.isAddingEvent = true;
        this.toastr.info('Click on any location on the map to set where you want your event', 'Add Event', {
            positionClass: 'toast-top-center',
        });
    }

    onFileChange(event: any): void {
        this.newEventImage = event.target.files[0];
    }
    categories: Category[] = [];
    private getAllCategories() {
        this.categoryService.getAllCategories().subscribe(
            (res: Category[]) => {
                this.categories = res;
            },
            (err) => {
                console.log(err);
            }
        );
    }
    //////////////////////////////////////////////

    payForm: FormGroup = new FormGroup({
        cardNumber: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        cardHolder: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        expirationDate: new FormControl('', [Validators.required]),
        cvv: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]),
    });

    @ViewChild('payDialog') payDialog!: TemplateRef<any>;

    openPayDialog() {
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
        if (bank.expirationDate && bank.expirationDate < new Date()) {
            this.toastr.error("Card is expired");
        }
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
        this.paymentService.payForRegisterEvent(paymentDetailsDTO).subscribe(
            (res: any) => {
                this.toastr.success('Payment Successful, an invoice was sent to you');
                let booking: Booking = {
                    bookingDate: new Date(),
                    userId: userId,
                    eventId: this.focusedEvent.id,
                };
                this.bookingService.registerForEvent(booking).subscribe(
                    (res: any) => {
                        console.log('registrations successful');
                    },
                    (err) => {
                        console.log('booking error', err);
                    }
                );
            },
            (err) => {
                console.log('in paymentService - payForRegisterEvent ', err);
                this.toastr.error('Payment failed');
            }
        );
    }

    searchName: string = '';
    updateEventsOnMap() {
        console.log('eventsOnMap length= ' + this.eventsOnMap.length);
        console.log('events length= ' + this.events.length);
        this.eventsOnMap = [];
        this.events.forEach((event) => {
            if (event !== null && event.latitude !== undefined && event.longitude !== undefined) {
                if (event.name.includes(this.searchName)) {
                    this.eventsOnMap.push({
                        event: event,
                        markerPosition: {
                            lat: event.latitude,
                            lng: event.longitude,
                        },
                    });
                }
            }
        });
    }
    onSearchNameChange() {
        console.log('eventsOnMap length= ' + this.eventsOnMap.length);
        console.log('events length= ' + this.events.length);
        this.updateEventsOnMap();
    }
}
