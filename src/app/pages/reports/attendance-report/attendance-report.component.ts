import { Component, OnInit } from "@angular/core";
import { DatePickerComponent } from "../../../shared/components/form/date-picker/date-picker.component";
import { AsyncPipe } from "@angular/common";
import { FullCalendarModule } from "@fullcalendar/angular";
import { AttendanceReportResponse } from "../../../models/attendance-report.model";
import { CalendarOptions, EventContentArg } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";

@Component({
  selector: "app-attendance-report",
  imports: [DatePickerComponent, AsyncPipe, FullCalendarModule],
  templateUrl: "./attendance-report.component.html",
  styleUrl: "./attendance-report.component.css",
})
export class AttendanceReportComponent implements OnInit {
  fromDate: string | null = null;
  toDate: string | null = null;

  selectedMonth = new Date();
  totalPresentDays = 0;
  totalAbsentDays = 0;
  totalHoursWorked = 0;

  // 🔁 Replace with data from your NgRx store / API
  attendanceData: AttendanceReportResponse[] = [
    {
      date: "2025-03-01",
      isPresent: true,
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      totalHours: 9,
    },
    {
      date: "2025-03-02",
      isPresent: false,
      checkIn: "-",
      checkOut: "-",
      totalHours: 0,
    },
    {
      date: "2025-03-03",
      isPresent: true,
      checkIn: "09:30 AM",
      checkOut: "07:00 PM",
      totalHours: 9.5,
    },
    {
      date: "2025-03-04",
      isPresent: true,
      checkIn: "08:50 AM",
      checkOut: "05:50 PM",
      totalHours: 9,
    },
    {
      date: "2025-03-05",
      isPresent: false,
      checkIn: "-",
      checkOut: "-",
      totalHours: 0,
    },
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "",
    },
    height: "auto",
    eventContent: (arg: EventContentArg) => this.renderEventContent(arg),
    events: [],
  };

  ngOnInit(): void {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    this.fromDate = this.formatedDate(oneMonthAgo);
    this.toDate = this.formatedDate(today);

    this.loadCalendar();
  }

  loadCalendar(): void {
    this.calculateSummary();
    this.mapToCalendarEvents();
  }

  calculateSummary(): void {
    this.totalPresentDays = this.attendanceData.filter(
      (r) => r.isPresent,
    ).length;
    this.totalAbsentDays = this.attendanceData.filter(
      (r) => !r.isPresent,
    ).length;
    this.totalHoursWorked = this.attendanceData.reduce(
      (sum, r) => sum + r.totalHours,
      0,
    );
  }

  mapToCalendarEvents(): void {
    const events = this.attendanceData.map((record) => ({
      date: record.date,
      backgroundColor: record.isPresent ? "#22c55e" : "#ef4444",
      borderColor: record.isPresent ? "#16a34a" : "#dc2626",
      textColor: "#ffffff",
      extendedProps: {
        isPresent: record.isPresent,
        checkIn: record.checkIn,
        checkOut: record.checkOut,
        totalHours: record.totalHours,
      },
    }));

    // ✅ Spread to trigger change detection
    this.calendarOptions = { ...this.calendarOptions, events };
  }

  renderEventContent(arg: EventContentArg) {
    const { isPresent, checkIn, checkOut, totalHours } =
      arg.event.extendedProps;
    return {
      html: isPresent
        ? `<div class="day-event present">
             <span class="status">✅ Present</span>
             <span class="time">🕘 ${checkIn} - ${checkOut}</span>
             <span class="hours">⏱ ${totalHours}h</span>
           </div>`
        : `<div class="day-event absent">
             <span class="status">❌ Absent</span>
           </div>`,
    };
  }

  formatedDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  onFromDateChange(event: any) {}
  onToDateChange(event: any) {}

  applyDateFilter(): void {
    if (!this.fromDate || !this.toDate) return;

    // ✅ Assign to local const — TypeScript now knows they are string, not null
    const fromDate = this.fromDate;
    const toDate = this.toDate;

    const filtered = this.attendanceData.filter((record) => {
      if (!record.date) return false; //
      const date = new Date(record.date);
      return date >= new Date(fromDate) && date <= new Date(toDate);
    });

    this.totalPresentDays = filtered.filter((r) => r.isPresent).length;
    this.totalAbsentDays = filtered.filter((r) => !r.isPresent).length;
    this.totalHoursWorked = filtered.reduce((sum, r) => sum + r.totalHours, 0);

    const events = filtered.map((record) => ({
      date: record.date,
      backgroundColor: record.isPresent ? "#22c55e" : "#ef4444",
      borderColor: record.isPresent ? "#16a34a" : "#dc2626",
      textColor: "#ffffff",
      extendedProps: {
        isPresent: record.isPresent,
        checkIn: record.checkIn,
        checkOut: record.checkOut,
        totalHours: record.totalHours,
      },
    }));

    this.calendarOptions = { ...this.calendarOptions, events };
  }
}
