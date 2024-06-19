import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { CanExit } from "../shared/can-exit";
import { delay } from "rxjs";
import { FlightService } from "./flight-search/flight.service";
import { inject } from "@angular/core";

export const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: 'flight-search',
    component: FlightSearchComponent,
  },
  {
    path: 'flight-edit/:id',
    component: FlightEditComponent,
    canDeactivate: [(cmp: unknown) => cmp instanceof CanExit ? cmp.canExit() : true],
    resolve: {
      flight: (r: ActivatedRouteSnapshot) =>
        inject(FlightService).findById(r.params['id']).pipe(delay(3000)),
    },
  },
  {
    path: 'passenger-search',
    component: PassengerSearchComponent,
    canDeactivate: [(cmp: unknown) => cmp instanceof CanExit ? cmp.canExit() : true],
  },
];

export default FLIGHT_BOOKING_ROUTES;
