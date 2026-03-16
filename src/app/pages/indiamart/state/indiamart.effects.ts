import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  failedIndiaMartCustomerAction,
  getIndiaMartCustomerSuccessAction,
  getIndianMartCustomerAction,
} from "./indiamart.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { IndiamartService } from "../services/indiamart.service";
import { concatLatestFrom } from "@ngrx/operators";
import { getIndiaMartCustomersSelector } from "./indiamart.selectors";

@Injectable()
export class IndiaMartEffect {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private indiamartService = inject(IndiamartService);

  getCustomerIndiaMart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getIndianMartCustomerAction),
      concatLatestFrom(() => this.store.select(getIndiaMartCustomersSelector)),
      switchMap(([action, indiaMartCustomer]) => {
        if (indiaMartCustomer.length > 0) {
          return of(
            getIndiaMartCustomerSuccessAction({ customers: indiaMartCustomer }),
          );
        }
        return this.indiamartService.getIndianMartCustomer().pipe(
          map((response) => {
            return getIndiaMartCustomerSuccessAction({
              customers: response.data,
            });
          }),
          catchError((error) => {
            return of(
              failedIndiaMartCustomerAction({ error: error?.error.message }),
            );
          }),
        );
      }),
    );
  });
}
