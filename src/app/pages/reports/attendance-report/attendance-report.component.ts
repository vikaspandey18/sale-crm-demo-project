import { Component, OnInit } from "@angular/core";
import { DatePickerComponent } from "../../../shared/components/form/date-picker/date-picker.component";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-attendance-report",
  imports: [DatePickerComponent, AsyncPipe],
  templateUrl: "./attendance-report.component.html",
  styleUrl: "./attendance-report.component.css",
})
export class AttendanceReportComponent implements OnInit {
  fromDate: string | null = null;
  toDate: string | null = null;

  tableData = [
    {
      id: 1,
      name: "TailGrids",
      category: "UI Kits",
      country: "/images/country/country-01.svg",
      cr: "Dashboard",
      value: "12,499",
    },
    {
      id: 2,
      name: "GrayGrids",
      category: "Templates",
      country: "/images/country/country-02.svg",
      cr: "Dashboard",
      value: "5498",
    },
    {
      id: 3,
      name: "Uideck",
      category: "Templates",
      country: "/images/country/country-03.svg",
      cr: "Dashboard",
      value: "4621",
    },
    {
      id: 4,
      name: "FormBold",
      category: "SaaS",
      country: "/images/country/country-04.svg",
      cr: "Dashboard",
      value: "13843",
    },
    {
      id: 5,
      name: "NextAdmin",
      category: "Templates",
      country: "/images/country/country-05.svg",
      cr: "Dashboard",
      value: "7523",
    },
    {
      id: 6,
      name: "Form Builder",
      category: "Templates",
      country: "/images/country/country-06.svg",
      cr: "Dashboard",
      value: "1,377",
    },
    {
      id: 7,
      name: "AyroUI",
      category: "Templates",
      country: "/images/country/country-07.svg",
      cr: "Dashboard",
      value: "599,00",
    },
  ];

  handleFilter() {
    console.log("Filter clicked");
    // Add your filter logic here
  }

  handleSeeAll() {
    console.log("See all clicked");
    // Add your see all logic here
  }

  ngOnInit(): void {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    this.fromDate = this.formatedDate(oneMonthAgo);
    this.toDate = this.formatedDate(today);
  }

  formatedDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  onFromDateChange(event: any) {}
  onToDateChange(event: any) {}

  applyDateFilter() {
    if(!this.fromDate || !this.toDate) return;
    
  }
}
