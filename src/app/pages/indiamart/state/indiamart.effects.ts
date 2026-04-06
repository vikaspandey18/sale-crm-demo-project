import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  failedIndiaMartCustomerAction,
  getIndiaMartCustomerSuccessAction,
  getIndianMartCustomerAction,
  updateIndiaMartCustomerFailureAction,
  updateIndiaMartCustomerSuccessAction,
  updateIndiaMartStartAction,
} from "./indiamart.actions";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
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

  updateCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateIndiaMartStartAction),
      mergeMap((action) => {
        return this.indiamartService
          .updateCustomer(action.id, action.field, action.value)
          .pipe(
            map(() => {
              return updateIndiaMartCustomerSuccessAction({
                id: action.id,
                field: action.field,
                value: action.value,
              });
            }),
            catchError((error) => {
              return of(
                updateIndiaMartCustomerFailureAction({
                  error: error?.error?.message || error?.message,
                }),
              );
            }),
          );
      }),
    );
  });
}
