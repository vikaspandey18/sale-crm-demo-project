import { Component, inject, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppState } from "./store/app.state";
import { Store } from "@ngrx/store";
import { getLoggedUser } from "./shared/components/auth/state/auth.actions";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "Angular Ecommerce Dashboard | TailAdmin";

  private store = inject(Store<AppState>);

  ngOnInit(): void {
    this.store.dispatch(getLoggedUser());
  }
}
