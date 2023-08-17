import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/Data/User';
import jwt_decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/shared/Data/Category';
import { SucceededDialogComponent } from 'src/app/shared/dynamic-dialoges/succeeded-dialog/succeeded-dialog.component';
import { FailedDialogComponent } from 'src/app/shared/dynamic-dialoges/failed-dialog/failed-dialog.component';

@Component({
    selector: 'app-categories',
    templateUrl: './manage-categories.component.html',
    styleUrls: ['./manage-categories.component.css'],
})
export class ManageCategoriesComponent implements OnInit {
    constructor(public categoryService: CategoryService, private dialog: MatDialog) {}

    token1?: any | string = localStorage.getItem('jwtToken');
    decodedToken: User | null = null;
    userId: any | number;
    categories: Category[] = [];

    categoryForm: FormGroup = new FormGroup({
        categoryName: new FormControl('', [Validators.required, Validators.minLength(4)]),
        description: new FormControl('', Validators.required),
    });

    editCategoryForm: FormGroup = new FormGroup({
        categoryName: new FormControl('', [Validators.required, Validators.minLength(4)]),
        description: new FormControl('', Validators.required),
    });

    category: Category = { id: 0 };

    ngOnInit(): void {
        if (this.token1) {
            this.decodedToken = jwt_decode(this.token1) as User;

            if (this.decodedToken) {
                this.userId = this.decodedToken['UserId']; // Use PascalCase here
            }
        }
        this.categoryService.getAllCategories().subscribe(
            (res: Category[]) => {
                this.categories = res;
            },
            (err) => {
                console.log(err);
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
    createCategory() {
        this.category.receivedImageFile = this.selectedImage;

        this.category.name = this.categoryForm.controls['categoryName'].value;
        this.category.description = this.categoryForm.controls['description'].value;
        this.category.creationDate = this.getCurrentDate();
        this.category.adminId = this.userId;

        this.categoryService.createCategory(this.category).subscribe((success: boolean) => {
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

    editedCategoryId: any;
    editCategory() {
        if (this.editCategoryForm.valid) {
            if (this.selectedImage) {
                this.category.receivedImageFile = this.selectedImage;
            }

            this.categoryService.getCategoryById(this.editedCategoryId).subscribe(
                (res: any) => {
                    this.category = res;
                    this.category.receivedImageFile = this.selectedImage;
                    this.category.description = this.editCategoryForm.get('description')?.value;
                    this.category.name = this.editCategoryForm.get('categoryName')?.value;

                    this.categoryService.editCategory(this.category).subscribe((success: boolean) => {
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
                },
                (err) => {
                    console.log('err=> ' + err);
                }
            );

            
        }
    }

    deleteCategory(id: number) {
        this.categoryService.deleteCategory(id).subscribe((success: boolean) => {
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

    detailsCategory(id: number) {
        this.categoryService.getCategoryById(id).subscribe(
            (res: any) => {
                this.category = res;
            },
            (err) => {
                console.log('err=> ' + err);
            }
        );
    }

    @ViewChild('addCategoryDailog') addCategoryDailog!: TemplateRef<any>;
    openCreateCategoryDialog() {
        const dialogRef = this.dialog.open(this.addCategoryDailog);
    }

    @ViewChild('editCategoryDailog') editCategoryDailog!: TemplateRef<any>;
    openEditCategoryDialog(id: number) {
        this.categoryService.getCategoryById(id).subscribe(
            (res: any) => {
                this.category = res;
                this.editCategoryForm.patchValue({
                    categoryName: this.category.name,
                    description: this.category.description
                });
            },
            (err) => {
                console.log('err=> ' + err);
            }
        );
        this.editedCategoryId = id;
        const dialogRef = this.dialog.open(this.editCategoryDailog);
    }

    @ViewChild('detailsCategoryDailog') detailsCategoryDailog!: TemplateRef<any>;
    opendetailsCategoryDialog(id: number) {
        this.detailsCategory(id);
        const dialogRef = this.dialog.open(this.detailsCategoryDailog);
    }
}
