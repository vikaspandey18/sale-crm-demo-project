import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LeadService } from "../services/lead.service";
import {
  getLeadErrorAction,
  getLeadStartAction,
  getLeadSuccessAction,
} from "./lead.actions";
import { catchError, concatMap, map, of } from "rxjs";

export class LeadEffect {
  private actions$ = inject(Actions);
  private leadService = inject(LeadService);

  getLead$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLeadStartAction),
      concatMap((action) => {
        return this.leadService.getLead().pipe(
          map((response) => {
            return getLeadSuccessAction({ leads: response.data });
          }),
          catchError((error) => {
            return of(getLeadErrorAction({ error: error?.error.message }));
          }),
        );
      }),
    );
  });
}
