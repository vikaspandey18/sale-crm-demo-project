import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { TelecallerService } from "../services/telecaller.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import {
  failedToGetTelecallerCustomerAction,
  getTelecallerCustomerStartAction,
  getTelecallerCustomerSuccessAction,
} from "./telecaller.actions";
import { getTelecallerCustomer } from "./telecaller.selectors";
import { concatLatestFrom } from "@ngrx/operators";

@Injectable()
export class TelecallerEffect {
  private store = inject(Store<AppState>);
  private telecallerService = inject(TelecallerService);
  private actions$ = inject(Actions);

  getTelecallerCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTelecallerCustomerStartAction),
      concatLatestFrom(() => this.store.select(getTelecallerCustomer)),
      switchMap(([action, customers]) => {
        if (customers.length > 0) {
          return of(getTelecallerCustomerSuccessAction({ customers }));
        }
        return this.telecallerService.getTelecaller().pipe(
          map((response) => {
            return getTelecallerCustomerSuccessAction({
              customers: response?.data,
            });
          }),
          catchError((error) => {
            return of(
              failedToGetTelecallerCustomerAction({
                error: error.error.message,
              }),
            );
          }),
        );
      }),
    );
  });
}
