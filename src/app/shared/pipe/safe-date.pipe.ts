import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "safeDate",
  standalone: true,
})
export class SafeDatePipe implements PipeTransform {
  transform(
    value: string | Date | null | undefined,
    format: string = "dd-MM-yyyy",
  ): string {
    if (!value) return "N/A";
    if (typeof value === "string" && value === "0000-00-00") return "N/A";

    const pipe = new DatePipe("en-US");
    return pipe.transform(value, format) ?? "N/A";
  }
}
