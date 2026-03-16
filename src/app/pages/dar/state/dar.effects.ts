import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DarService } from "../services/dar.service";
import {
  fetchDarFailedAction,
  fetchDarStartAction,
  fetchDarSuccessAction,
} from "./dar.actions";
import { catchError, concatMap, map, of } from "rxjs";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { getDarSelector } from "./dar.selectors";

export class DarEffect {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private darService = inject(DarService);

  getDar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchDarStartAction),
      concatLatestFrom(() => this.store.select(getDarSelector)),
      concatMap(([action, dars]) => {
        if (dars.length > 0) {
          return of(fetchDarSuccessAction({ dar: dars }));
        }
        return this.darService.getDar().pipe(
          map((response) => {
            return fetchDarSuccessAction({ dar: response.data });
          }),
          catchError((error) => {
            return of(fetchDarFailedAction({ error: error?.message }));
          }),
        );
      }),
    );
  });
}
