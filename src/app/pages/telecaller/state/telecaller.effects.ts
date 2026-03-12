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

@Injectable()
export class TelecallerEffect {
  private store = inject(Store<AppState>);
  private telecallerService = inject(TelecallerService);
  private actions$ = inject(Actions);

  getTelecallerCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTelecallerCustomerStartAction),
      switchMap((action) => {
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
