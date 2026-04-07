import { Routes } from "@angular/router";
import { EcommerceComponent } from "./pages/dashboard/ecommerce/ecommerce.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { FormElementsComponent } from "./pages/forms/form-elements/form-elements.component";
import { BasicTablesComponent } from "./pages/tables/basic-tables/basic-tables.component";
import { BlankComponent } from "./pages/blank/blank.component";
import { NotFoundComponent } from "./pages/other-page/not-found/not-found.component";
import { AppLayoutComponent } from "./shared/layout/app-layout/app-layout.component";
import { InvoicesComponent } from "./pages/invoices/invoices.component";
import { LineChartComponent } from "./pages/charts/line-chart/line-chart.component";
import { BarChartComponent } from "./pages/charts/bar-chart/bar-chart.component";
import { AlertsComponent } from "./pages/ui-elements/alerts/alerts.component";
import { AvatarElementComponent } from "./pages/ui-elements/avatar-element/avatar-element.component";
import { BadgesComponent } from "./pages/ui-elements/badges/badges.component";
import { ButtonsComponent } from "./pages/ui-elements/buttons/buttons.component";
import { ImagesComponent } from "./pages/ui-elements/images/images.component";
import { VideosComponent } from "./pages/ui-elements/videos/videos.component";
import { SignInComponent } from "./pages/auth-pages/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/auth-pages/sign-up/sign-up.component";
import { CalenderComponent } from "./pages/calender/calender.component";
import { CustomersComponent } from "./pages/customers/customers.component";
import { TelecallerComponent } from "./pages/telecaller/telecaller.component";
import { IndiamartComponent } from "./pages/indiamart/indiamart.component";
import { LeadsComponent } from "./pages/leads/leads.component";
import { AttendanceComponent } from "./pages/attendance/attendance.component";
import { DarComponent } from "./pages/dar/dar.component";
import { MyReportComponent } from "./pages/reports/my-report/my-report.component";
import { OrderReportComponent } from "./pages/reports/order-report/order-report.component";
import { CollectionReportComponent } from "./pages/reports/collection-report/collection-report.component";
import { AttendanceReportComponent } from "./pages/reports/attendance-report/attendance-report.component";
import { authGuard } from "./shared/components/auth/services/auth.guard";
import { FollowupsComponent } from "./pages/followups/followups.component";
import { AddCustomerComponent } from "./pages/customers/add-customer/add-customer.component";
import { DeleteCustomerComponent } from "./pages/customers/delete-customer/delete-customer.component";
import { noAuthGuardGuard } from "./guard/no-auth-guard.guard";
import { DetailReportComponent } from "./pages/reports/my-report/detail-report/detail-report.component";

export const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        component: EcommerceComponent,
        pathMatch: "full",
        title: "Rushabh Fastners Dashboard",
      },
      {
        path: "calendar",
        component: CalenderComponent,
        title: "Calender",
      },
      {
        path: "profile",
        component: ProfileComponent,
        title: "Profile",
      },
      {
        path: "form-elements",
        component: FormElementsComponent,
        title: "Form Elements",
      },
      {
        path: "basic-tables",
        component: BasicTablesComponent,
        title: "Basic Tables",
      },
      {
        path: "blank",
        component: BlankComponent,
        title: "Blank",
      },
      // support tickets
      {
        path: "invoice",
        component: InvoicesComponent,
        title: "Invoice",
      },
      {
        path: "line-chart",
        component: LineChartComponent,
        title: "Line Chart",
      },
      {
        path: "bar-chart",
        component: BarChartComponent,
        title: "Bar Chart",
      },
      {
        path: "alerts",
        component: AlertsComponent,
        title: "Alerts",
      },
      {
        path: "avatars",
        component: AvatarElementComponent,
        title: "Avatars",
      },
      {
        path: "badge",
        component: BadgesComponent,
        title: "Badge",
      },
      {
        path: "buttons",
        component: ButtonsComponent,
        title: "Buttons",
      },
      {
        path: "images",
        component: ImagesComponent,
        title: "Images",
      },
      {
        path: "videos",
        component: VideosComponent,
        title: "Videos",
      },
      {
        path: "customer",
        component: CustomersComponent,
        title: "Customer",
      },
      {
        path: "telecaller",
        component: TelecallerComponent,
        title: "TeleCaller",
      },
      {
        path: "indiamart",
        component: IndiamartComponent,
        title: "India Mart",
      },
      {
        path: "lead",
        component: LeadsComponent,
        title: "Lead",
      },
      {
        path: "attendance",
        component: AttendanceComponent,
        title: "Attendance",
      },
      {
        path: "dar",
        component: DarComponent,
        title: "Dar",
      },
      {
        path: "my-report",
        component: MyReportComponent,
        title: "My Report",
      },
      {
        path: "order-report",
        component: OrderReportComponent,
        title: "Order Report",
      },
      {
        path: "collection-report",
        component: CollectionReportComponent,
        title: "Collection Report",
      },
      {
        path: "attendance-report",
        component: AttendanceReportComponent,
        title: "Attendance Report",
      },
      {
        path: "followup",
        component: FollowupsComponent,
        title: "Follow Up",
      },
      {
        path: "add-customer",
        component: AddCustomerComponent,
        title: "Add Customer",
      },
      {
        path: "delete-customer",
        component: DeleteCustomerComponent,
        title: "Delete Customer",
      },
      {
        path: "detail-report/:date",
        component: DetailReportComponent,
        title: "Detail Report",
      },
    ],
  },
  // auth pages
  {
    path: "signin",
    component: SignInComponent,
    title: "Sign In",
    canActivate: [noAuthGuardGuard],
  },
  {
    path: "signup",
    component: SignUpComponent,
    title: "Sign Up",
    canActivate: [noAuthGuardGuard],
  },
  // error pages
  {
    path: "**",
    component: NotFoundComponent,
    title: "Not Found",
  },
];
