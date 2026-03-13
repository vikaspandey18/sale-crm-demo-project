import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CollectionReportService } from "../services/collection-report.service";
import {
  fetchCollectionReportFailedAction,
  fetchCollectionReportStartAction,
  fetchCollectionReportSuccessAction,
} from "./collection-report.actions";
import { catchError, concatMap, map, of, switchMap } from "rxjs";

@Injectable()
export class CollectionReportEffect {
  private actions$ = inject(Actions);
  private collectionReportService = inject(CollectionReportService);

  collectionReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCollectionReportStartAction),
      switchMap((action) => {
        return this.collectionReportService.getCollectionReport().pipe(
          map((response) => {
            if (response.data?.length > 0) {
              return fetchCollectionReportSuccessAction({
                collections: response.data,
              });
            } else {
              return fetchCollectionReportFailedAction({
                error: response.message,
              });
            }
          }),
          catchError((error) => {
            return of(
              fetchCollectionReportFailedAction({
                error: error?.error.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });
}
