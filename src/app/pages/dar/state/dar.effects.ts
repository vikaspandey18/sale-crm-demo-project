import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DarService } from "../services/dar.service";
import {
  fetchDarFailedAction,
  fetchDarStartAction,
  fetchDarSuccessAction,
} from "./dar.actions";
import { catchError, concatMap, map, of } from "rxjs";

export class DarEffect {
  private actions$ = inject(Actions);
  private darService = inject(DarService);

  getDar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchDarStartAction),
      concatMap((action) => {
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
