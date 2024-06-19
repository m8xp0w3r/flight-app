import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, AsyncValidatorFn, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Flight } from '../model/flight';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlightService } from "../flight-search/flight.service";
import { delay, map } from "rxjs";

@Component({
  selector: 'app-flight-edit-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-edit-reactive.component.html',
  styleUrls: ['./flight-edit-reactive.component.css'],
})
export class FlightEditReactiveComponent {
  private flightService = inject(FlightService);
  private dialogRef = inject(MatDialogRef);

  private data = inject<{ flight: Flight }>(MAT_DIALOG_DATA);
  flight = this.data.flight;

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    id: [0],
    from: ['', [Validators.required, Validators.minLength(3)], [validateAsyncCity(this.flightService)]],
    to: [''],
    date: [''],
    delayed: [false],
  });

  constructor() {
    this.form.patchValue(this.flight);

    this.form.valueChanges.subscribe((flightForm) => {
      //console.log('flight form changed:', flightForm);
    });

    this.form.controls.from.valueChanges.subscribe((from) => {
      //console.log('from changed:', from);
    });
  }

  save(): void {
    this.flight = this.form.getRawValue();
    console.log('flight', this.flight);
  }

  close(): void {
    this.dialogRef.close();
  }
}

export function validateAsyncCity(flightService: FlightService): AsyncValidatorFn {
  return (c: AbstractControl) => {

    return flightService.find(c.value, '').pipe(
      delay(1000),
      map((flights) => {
        console.log("c", c.value);
        return (flights.length > 0 ? {} : { });
      })
    );
  };
}
