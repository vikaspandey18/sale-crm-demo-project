import { Component, Input, OnInit } from "@angular/core";
import { UserRespone } from "../../../../models/user.model";
import { CommonModule, UpperCasePipe } from "@angular/common";

@Component({
  selector: "app-user-meta-card",
  imports: [CommonModule],
  templateUrl: "./user-meta-card.component.html",
  styles: ``,
})
export class UserMetaCardComponent {
  @Input({ required: true }) user!: UserRespone | null;
}
