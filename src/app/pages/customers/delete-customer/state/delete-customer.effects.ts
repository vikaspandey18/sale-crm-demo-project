import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { catchError, EMPTY, map, of, switchMap } from "rxjs";
import { AppState } from "../../../../store/app.state";
import { CustomerService } from "../../services/customer.service";
import {
  getDeleteCustomer,
  getDeleteCustomerFailure,
  getDeleteCustomerSuccess,
} from "./delete-customer.actions";
import { selectDelCustomer } from "./delete-customer.selectors";

@Injectable()
export class DeleteCustomerEffect {
  private store = inject(Store<AppState>);
  private customerService = inject(CustomerService);
  private actions$ = inject(Actions);

  getCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDeleteCustomer),
      concatLatestFrom(() => this.store.select(selectDelCustomer)),
      switchMap(([action, customers]) => {
        if (customers.length > 0) {
          return of(getDeleteCustomerSuccess({ customers }));
        }
        return this.customerService.getDeleteCustomer().pipe(
          map((response: any) => {
            return getDeleteCustomerSuccess({ customers: response.data });
          }),
          catchError((error) => {
            return of(
              getDeleteCustomerFailure({ error: error?.error.message }),
            );
          }),
        );
      }),
    );
  });
}
