import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LeadService } from "../services/lead.service";
import {
  getLeadErrorAction,
  getLeadStartAction,
  getLeadSuccessAction,
} from "./lead.actions";
import { catchError, concatMap, map, of } from "rxjs";
import { AppState } from "../../../store/app.state";
import { Store } from "@ngrx/store";
import { concatLatestFrom } from "@ngrx/operators";
import { getLeadSelector } from "./lead.selectors";

export class LeadEffect {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private leadService = inject(LeadService);

  getLead$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLeadStartAction),
      concatLatestFrom(() => this.store.select(getLeadSelector)),
      concatMap(([action, allLeads]) => {
        if (allLeads.length > 0) {
          return of(getLeadSuccessAction({ leads: allLeads }));
        }
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
