import { Component } from "@angular/core";
import { BadgeComponent } from "../../shared/components/ui/badge/badge.component";
import { ButtonComponent } from "../../shared/components/ui/button/button.component";

@Component({
  selector: "app-attendance",
  imports: [ButtonComponent],
  templateUrl: "./attendance.component.html",
  styleUrl: "./attendance.component.css",
})
export class AttendanceComponent {
  checkIn() {
    alert("check in button click");
  }

  checkOut() {
    alert("check out button click");
  }
}
