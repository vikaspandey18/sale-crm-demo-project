import { Component, inject, OnInit } from "@angular/core";
import { DatePickerComponent } from "../../../shared/components/form/date-picker/date-picker.component";
import { AsyncPipe, CommonModule } from "@angular/common";
import { FullCalendarModule } from "@fullcalendar/angular";
import { AttendanceReportResponse } from "../../../models/attendance-report.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { loadAttendanceReportStartAction } from "./state/attedance-report.actions";
import { Observable } from "rxjs";
import {
  selectAttendaceReport,
  selectErrorAttendaceReport,
  selectLoadingAttendaceReport,
} from "./state/attedance-report.selectors";

@Component({
  selector: "app-attendance-report",
  imports: [DatePickerComponent, FullCalendarModule, AsyncPipe, CommonModule],
  templateUrl: "./attendance-report.component.html",
  styleUrl: "./attendance-report.component.css",
})
export class AttendanceReportComponent implements OnInit {
  private store = inject(Store<AppState>);

  fromDate: string | null = null;
  toDate: string | null = null;

  selectedMonth = new Date();
  totalPresentDays = 0;
  totalAbsentDays = 0;
  totalHoursWorked = 0;

  attendanceData$!: Observable<AttendanceReportResponse[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit() {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    this.fromDate = this.formatedDate(oneMonthAgo);
    this.toDate = this.formatedDate(today);

    this.store.dispatch(
      loadAttendanceReportStartAction({
        fromDate: this.fromDate,
        toDate: this.toDate,
      }),
    );

    this.attendanceData$ = this.store.select(selectAttendaceReport);
    this.loading$ = this.store.select(selectLoadingAttendaceReport);
    this.error$ = this.store.select(selectErrorAttendaceReport);
  }

  formatedDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  onFromDateChange(event: any) {
    this.fromDate = event.dateStr;
  }
  onToDateChange(event: any) {
    this.toDate = event.dateStr;
  }

  applyDateFilter(): void {
    if (!this.fromDate || !this.toDate) return;

    this.store.dispatch(
      loadAttendanceReportStartAction({
        fromDate: this.fromDate,
        toDate: this.toDate,
      }),
    );
  }
}
