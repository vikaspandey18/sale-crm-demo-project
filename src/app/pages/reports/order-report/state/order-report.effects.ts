import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OrderReportService } from "../services/order-report.service";
import {
  fetchOrderReportFailedAction,
  fetchOrderReportStartAction,
  fetchOrderReportSuccessAction,
} from "./order-report.actions";
import { catchError, concatMap, map, of } from "rxjs";

@Injectable()
export class OrderReportEffect {
  private actions$ = inject(Actions);
  private orderReportService = inject(OrderReportService);

  orderReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchOrderReportStartAction),
      concatMap((action) => {
        return this.orderReportService.getOrderReport().pipe(
          map((response) => {
            return fetchOrderReportSuccessAction({ orders: response.data });
          }),
          catchError((error) => {
            return of(
              fetchOrderReportFailedAction({
                error: error?.error.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });
}
