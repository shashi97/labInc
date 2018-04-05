import { NgModule } from '@angular/core';
import { dashboardRouting } from './dashboard.routing';
import { SharedComponentModule } from '../shared/shared-component.module';

import {
DashboardComponent
 // PatientEditMainComponent
} from './index';


@NgModule({
  imports: [
    SharedComponentModule,
    dashboardRouting
  ],
  declarations: [
   DashboardComponent
  ]
})

export class DashboardModule { }
