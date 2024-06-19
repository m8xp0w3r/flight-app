import { Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
  message = inject(DIALOG_DATA) as string;
  dialogRef = inject(DialogRef) as DialogRef<boolean>;

  close(decision: boolean): void {
    this.dialogRef.close(decision);
  }
}
