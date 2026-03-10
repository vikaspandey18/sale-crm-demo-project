import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import {
  getEmployeeGroup,
  getEmployeeId,
} from "../shared/components/auth/state/auth.selectors";
import { switchMap, take } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return store.select(getEmployeeId).pipe(
    take(1),
    switchMap((employeeId) =>
      store.select(getEmployeeGroup).pipe(
        take(1),
        switchMap((employeeGroup) => {
          const modifiedReq = req.clone({
            setHeaders: {
              "X-Employee-Id": employeeId ?? "",
              "X-Employee-Group": employeeGroup ?? "",
            },
          });

          return next(modifiedReq);
        }),
      ),
    ),
  );
};
