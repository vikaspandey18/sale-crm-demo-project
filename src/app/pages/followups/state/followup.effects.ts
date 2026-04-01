import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FollowupService } from "../service/followup.service";
import {
  loadFollowUpCustomerFailedAction,
  loadFollowUpCustomerStartAction,
  loadFollowUpCustomerSuccessAction,
  updateFollowUpCustomerFailedAction,
  updateFollowUpCustomerStartAction,
  updateFollowUpCustomerSuccessAction,
} from "./followup.actions";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";

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

  updateCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateFollowUpCustomerStartAction),
      mergeMap((action) => {
        return this.followUpService
          .updateCustomer(
            action.id,
            action.field,
            action.value,
            action.journeryId,
          )
          .pipe(
            map((response) => {
              return updateFollowUpCustomerSuccessAction({
                id: action.id,
                field: action.field,
                value: action.value,
              });
            }),
            catchError((error) => {
              return of(
                updateFollowUpCustomerFailedAction({
                  error: error.error.message || error.message,
                }),
              );
            }),
          );
      }),
    );
  });
}
