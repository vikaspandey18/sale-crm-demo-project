import { Component, inject, OnInit } from "@angular/core";
import { PageBreadcrumbComponent } from "../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { UserMetaCardComponent } from "../../shared/components/user-profile/user-meta-card/user-meta-card.component";
import { UserInfoCardComponent } from "../../shared/components/user-profile/user-info-card/user-info-card.component";
import { UserAddressCardComponent } from "../../shared/components/user-profile/user-address-card/user-address-card.component";
import { AppState } from "../../store/app.state";
import { Store } from "@ngrx/store";
import { loadUserStartAction } from "./state/user.actions";
import { Observable } from "rxjs";
import { UserRespone } from "../../models/user.model";
import {
  selectUserData,
  selectUserError,
  selectUserLoading,
} from "./state/user.selectors";
import { AsyncPipe } from "@angular/common";
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";

@Component({
  selector: "app-profile",
  imports: [
    PageBreadcrumbComponent,
    UserMetaCardComponent,
    UserInfoCardComponent,
    AsyncPipe,
    AlertComponent,
  ],
  templateUrl: "./profile.component.html",
  styles: ``,
})
export class ProfileComponent implements OnInit {
  private store = inject(Store<AppState>);
  user$!: Observable<UserRespone | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    this.store.dispatch(loadUserStartAction());

    this.user$ = this.store.select(selectUserData);
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);
  }
}
