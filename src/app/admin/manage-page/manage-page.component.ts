import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/Data/User';
import { MatDialog } from '@angular/material/dialog';
import { SucceededDialogComponent } from 'src/app/shared/dynamic-dialoges/succeeded-dialog/succeeded-dialog.component';
import { FailedDialogComponent } from 'src/app/shared/dynamic-dialoges/failed-dialog/failed-dialog.component';
import { PageService } from 'src/app/services/page.service';
import { Page } from 'src/app/shared/Data/Page';



@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.css']
})
export class ManagePageComponent {
  constructor(private dialog: MatDialog, private pageService:PageService) {}

    token1?: any | string = localStorage.getItem('jwtToken');
    decodedToken: User | null = null;
    userId: any | number;
    categories: Page[] = [];

    pageForm: FormGroup = new FormGroup({
        content1: new FormControl(''),
        content2: new FormControl(''),
    });

    editPageForm: FormGroup = new FormGroup({
        content1: new FormControl(''),
        content2: new FormControl(''),
    });

    page: Page = {
        id: 0,
        retrievedImageFile: ''
    };
    pages:any;
    ngOnInit(): void {
        this.pageService.getAllPages().subscribe(
            (res: any) => {
                console.log('get all pages successful');
                this.pages = res;
            },
            (err) => {
                console.log('booking error', err);
            }
        );
    }

    getCurrentDate(): Date {
        return new Date();
    }

    selectedImage: File | undefined;

    onFileChange(event: any): void {
        this.selectedImage = event.target.files[0];
    }
    createPage() {
        this.page.receivedImageFile = this.selectedImage;

        this.page.content1 = this.pageForm.controls['content1'].value;
        this.page.content2 = this.pageForm.controls['content2'].value;
        this.page.adminId = this.userId;

        this.pageService.createPage(this.page).subscribe((success: boolean) => {
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

    editedPageById: any;
    editPage() {
        if (this.editPageForm.valid) {
            this.pageService.getPageById(this.editedPageById).subscribe(
                (res: any) => {
                    this.page = res;
                },
                (err) => {
                    console.log('err=> ' + err);
                }
            );
            if (this.selectedImage) {
                this.page.receivedImageFile = this.selectedImage;
            }
            if(this.page.content1 != null){
                this.page.content1 = this.editPageForm.get('content1')?.value;;
            }
            if(this.page.content2 != null){
                this.page.content2 = this.editPageForm.get('content2')?.value;;
            }
            
            this.pageService.editPage(this.page).subscribe((success: boolean) => {
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

    deletePage(id: number) {
        this.pageService.deletePage(id).subscribe((success: boolean) => {
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

    detailsPage(id: number) {
        this.pageService.getPageById(id).subscribe(
            (res: any) => {
                this.page = res;
            },
            (err) => {
                console.log('err=> ' + err);
            }
        );
    }

    @ViewChild('addPageDailog') addPageDailog!: TemplateRef<any>;
    openCreatePageDialog() {
        const dialogRef = this.dialog.open(this.addPageDailog);
    }

    @ViewChild('editPageDailog') editPageDailog!: TemplateRef<any>;
    openEditPageDialog(id: number) {
        this.editedPageById = id;
        this.pageService.getPageById(this.editedPageById).subscribe(
            (res: any) => {
                this.page = res;
                this.editPageForm.patchValue({
                    content1: this.page.content1,
                    content2: this.page.content2,
                });
                const dialogRef = this.dialog.open(this.editPageDailog);
            },
            (err) => {
                console.log('err=> ' + err);
            }
        );
        // this.editPageForm.controls['content1'].setValue(this.page.content1);
        
    }

    @ViewChild('detailsPageDailog') detailsPageDailog!: TemplateRef<any>;
    opendetailsPageDialog(id: number) {
        this.detailsPage(id);
        const dialogRef = this.dialog.open(this.detailsPageDailog);
    }
}
