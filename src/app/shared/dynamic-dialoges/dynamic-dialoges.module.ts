import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucceededDialogComponent } from './succeeded-dialog/succeeded-dialog.component';
import { FailedDialogComponent } from './failed-dialog/failed-dialog.component';



@NgModule({
  declarations: [
    SucceededDialogComponent,
    FailedDialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SucceededDialogComponent,
    FailedDialogComponent
  ]
})
export class DynamicDialogesModule { }
