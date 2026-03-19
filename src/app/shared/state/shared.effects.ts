import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../services/product.service";
import {
  getProductFailedAction,
  getProductStartAction,
  getProductSuccessAction,
} from "./shared.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { concatLatestFrom } from "@ngrx/operators";
import { getProductSelector } from "./shared.selectors";

@Injectable()
export class SharedEffect {
  private store = inject(Store<AppState>);
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  getProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProductStartAction),
      concatLatestFrom(() => this.store.select(getProductSelector)),
      exhaustMap(([action, product]) => {
        if (product.length > 0) {
          return of(getProductSuccessAction({ product_name: product }));
        }
        return this.productService.getProduct().pipe(
          map((response) => {
            return getProductSuccessAction({ product_name: response.data });
          }),
          catchError((error) => {
            return of(
              getProductFailedAction({
                error: error.error.message || error.message,
              }),
            );
          }),
        );
      }),
    );
  });
}
