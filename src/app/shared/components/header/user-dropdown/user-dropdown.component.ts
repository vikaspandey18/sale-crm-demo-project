import { Component, inject } from "@angular/core";
import { DropdownComponent } from "../../ui/dropdown/dropdown.component";
import { AsyncPipe, CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DropdownItemTwoComponent } from "../../ui/dropdown/dropdown-item/dropdown-item.component-two";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.state";
import { getAuthName } from "../../auth/state/auth.selectors";
import { logoutAction } from "../../auth/state/auth.actions";

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
export class UserDropdownComponent {
  isOpen = false;

  private store = inject(Store<AppState>);

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  username$ = this.store.select(getAuthName);

  onSignout() {
    this.store.dispatch(logoutAction());
  }
}
