import { Component, inject, OnInit } from "@angular/core";
import { DropdownComponent } from "../../ui/dropdown/dropdown.component";
import { AsyncPipe, CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DropdownItemTwoComponent } from "../../ui/dropdown/dropdown-item/dropdown-item.component-two";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.state";
import { getAuthName } from "../../auth/state/auth.selectors";
import { logoutAction } from "../../auth/state/auth.actions";
import { Observable } from "rxjs";
import { loadUserStartAction, removeUserAction } from "../../../../pages/profile/state/user.actions";
import { UserRespone } from "../../../../models/user.model";
import { selectUserData } from "../../../../pages/profile/state/user.selectors";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
  imports: [
    CommonModule,
    RouterModule,
    DropdownComponent,
    DropdownItemTwoComponent,
    AsyncPipe,
  ],
})
export class UserDropdownComponent implements OnInit {
  isOpen = false;

  private store = inject(Store<AppState>);

  readonly username$: Observable<string | null> =
    this.store.select(getAuthName);

  user$!: Observable<UserRespone | null>;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  ngOnInit(): void {
    this.store.dispatch(loadUserStartAction());

    this.user$ = this.store.select(selectUserData);
  }

  onSignout() {
    this.store.dispatch(logoutAction());
    this.store.dispatch(removeUserAction());
  }
}
