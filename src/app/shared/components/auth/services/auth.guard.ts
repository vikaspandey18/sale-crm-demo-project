import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.state";
import { getEmployeeId } from "../state/auth.selectors";
import { map, take } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const store: Store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(getEmployeeId).pipe(
    take(1),
    map((action) => {
      if (action) {
        return true;
      }
      router.navigate(["/signin"]);
      return false;
    }),
  );

  return true;
};
