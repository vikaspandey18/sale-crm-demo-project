import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { CustomerService } from "../services/customer.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  getCustomer,
  getCustomerFailure,
  getCustomerSuccess,
} from "./customer.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class CustomerEffect {
  private store = inject(Store<AppState>);
  private customerService = inject(CustomerService);
  private actions$ = inject(Actions);

  getCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCustomer),
      switchMap((action) => {
        return this.customerService.getCustomer().pipe(
          map((response: any) => {
            return getCustomerSuccess({ customers: response.data });
          }),
          catchError((error) => {
            return of(getCustomerFailure({ error: error?.error.message }));
          }),
        );
      }),
    );
  });
}
