import { Component, inject, OnInit } from "@angular/core";
import { ButtonComponent } from "../../shared/components/ui/button/button.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import {
  markCheckInAction,
  markCheckOutAction,
} from "./state/attendance.actions";
import { AsyncPipe, DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import {
  getMarkAttendanceCheckIn,
  getMarkAttendanceCheckOut,
  getMarkAttendanceError,
  getMarkAttendanceLoading,
} from "./state/attendance.selectors";

@Component({
  selector: "app-attendance",
  imports: [ButtonComponent, AsyncPipe],
  templateUrl: "./attendance.component.html",
  styleUrl: "./attendance.component.css",
  providers: [DatePipe],
})
export class AttendanceComponent implements OnInit {
  private store: Store = inject(Store<AppState>);
  private datePipe = inject(DatePipe);

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  checkIn$!: Observable<string | null>;
  checkOut$!: Observable<string | null>;

  checkIn() {
    const checkInTime =
      this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss") || "";

    this.store.dispatch(markCheckInAction({ checkIn: checkInTime }));
  }

  checkOut() {
    const checkOutTime =
      this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss") || "";

    this.store.dispatch(markCheckOutAction({ checkOut: checkOutTime }));
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(getMarkAttendanceLoading);
    this.error$ = this.store.select(getMarkAttendanceError);
    this.checkIn$ = this.store.select(getMarkAttendanceCheckIn);
    this.checkOut$ = this.store.select(getMarkAttendanceCheckOut);
  }
}
