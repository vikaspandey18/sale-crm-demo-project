import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { CustomerEffect } from "../pages/customers/state/customer.effects";
import { customerReducer } from "../pages/customers/state/customer.reducer";
import { CustomerState } from "../pages/customers/state/customer.state";
import { DarEffect } from "../pages/dar/state/dar.effects";
import { darReducer } from "../pages/dar/state/dar.reducer";
import { DarState } from "../pages/dar/state/dar.state";
import { IndiaMartEffect } from "../pages/indiamart/state/indiamart.effects";
import { indiaMartReducer } from "../pages/indiamart/state/indiamart.reducer";
import { IndiaMartState } from "../pages/indiamart/state/indiamart.state";
import { LeadEffect } from "../pages/leads/state/lead.effects";
import { leadReducer } from "../pages/leads/state/lead.reducer";
import { LeadState } from "../pages/leads/state/lead.state";
import { MyReportEffect } from "../pages/reports/my-report/state/my-report.effects";
import { myReportReducer } from "../pages/reports/my-report/state/my-report.reducer";
import { MyReportState } from "../pages/reports/my-report/state/my-report.state";
import { TelecallerEffect } from "../pages/telecaller/state/telecaller.effects";
import { telecallerReducer } from "../pages/telecaller/state/telecaller.reducer";
import { TelecallerState } from "../pages/telecaller/state/telecaller.state";
import { AuthEffect } from "../shared/components/auth/state/auth.effects";
import { authReducer } from "../shared/components/auth/state/auth.reducer";
import { AuthState } from "../shared/components/auth/state/auth.state";
import { OrderReportState } from "../pages/reports/order-report/state/order-report.state";
import { orderReportReducer } from "../pages/reports/order-report/state/order-report.reducer";
import { OrderReportEffect } from "../pages/reports/order-report/state/order-report.effects";
import { CollectionReportState } from "../pages/reports/collection-report/state/collection-report.state";
import { collectionReportReducer } from "../pages/reports/collection-report/state/collection-report.reducer";
import { CollectionReportEffect } from "../pages/reports/collection-report/state/collection-report.effects";
import { AttendanceState } from "../pages/attendance/state/attendance.state";
import { markAttendanceReducer } from "../pages/attendance/state/attendance.reducer";
import { MarkAttendaceEffect } from "../pages/attendance/state/attendance.effects";

export interface AppState {
  auth: AuthState;
  customer: CustomerState;
  indiamart: IndiaMartState;
  telecaller: TelecallerState;
  lead: LeadState;
  dar: DarState;
  myReport: MyReportState;
  router: RouterReducerState;
  orderReport: OrderReportState;
  collectionReport: CollectionReportState;
  markAttendance: AttendanceState;
}

export const AppReducer = {
  auth: authReducer,
  customer: customerReducer,
  indiamart: indiaMartReducer,
  telecaller: telecallerReducer,
  lead: leadReducer,
  dar: darReducer,
  myReport: myReportReducer,
  router: routerReducer,
  orderReport: orderReportReducer,
  collectionReport: collectionReportReducer,
  markAttendance: markAttendanceReducer,
};

export const AppEffect = [
  AuthEffect,
  CustomerEffect,
  IndiaMartEffect,
  TelecallerEffect,
  LeadEffect,
  DarEffect,
  MyReportEffect,
  OrderReportEffect,
  CollectionReportEffect,
  MarkAttendaceEffect,
];
