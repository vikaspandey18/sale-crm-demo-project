import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { getEmployeeId } from "../shared/components/auth/state/auth.selectors";
import { map, take } from "rxjs";

export const noAuthGuardGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(getEmployeeId).pipe(
    take(1),
    map((id) => {
      if (id) {
        return router.createUrlTree(["/"]);
      } else {
        return true;
      }
    }),
  );
};
