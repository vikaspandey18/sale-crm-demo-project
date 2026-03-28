import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FollowupService } from "../service/followup.service";
import {
  loadFollowUpCustomerFailedAction,
  loadFollowUpCustomerStartAction,
  loadFollowUpCustomerSuccessAction,
} from "./followup.actions";
import { catchError, map, of, switchMap } from "rxjs";

export class FollowUpEffect {
  private actions$ = inject(Actions);
  private followUpService = inject(FollowupService);

  getFollowUpCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFollowUpCustomerStartAction),
      switchMap((action) => {
        return this.followUpService.getFollowUpCustomer().pipe(
          map((response) => {
            return loadFollowUpCustomerSuccessAction({
              customers: response.data,
            });
          }),
          catchError((error) => {
            return of(
              loadFollowUpCustomerFailedAction({
                error: error.error.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });
}
