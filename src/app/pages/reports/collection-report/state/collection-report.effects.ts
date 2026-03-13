import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CollectionReportService } from "../services/collection-report.service";
import {
  fetchCollectionReportFailedAction,
  fetchCollectionReportStartAction,
  fetchCollectionReportSuccessAction,
} from "./collection-report.actions";
import { catchError, concatMap, map, of } from "rxjs";

@Injectable()
export class CollectionReportEffect {
  private actions$ = inject(Actions);
  private collectionReportService = inject(CollectionReportService);

  collectionReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCollectionReportStartAction),
      concatMap((action) => {
        return this.collectionReportService.getCollectionReport().pipe(
          map((response) => {
            return fetchCollectionReportSuccessAction({
              collections: response.data,
            });
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
