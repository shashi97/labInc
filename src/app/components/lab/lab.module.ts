import { NgModule } from '@angular/core';
import { labRouting } from './lab.routing';
import { SharedComponentModule } from '../shared/shared-component.module';


import {
  LabComponent,
  LabEditComponent,
  LabService,
  LabViewComponent,
  TestComponent,
  SearchTestComponent,
  TestService,
  SearchInsuranceComapnyComponent,
  LabInsuranceComponent,
  LabInsuranceService,
  FeeScheduleComponent,
  FeeScheduleService,
  LabInsuranceLeftNavbarComponent
} from './index';


@NgModule({
  imports: [
    SharedComponentModule,
    labRouting
  ],
  declarations: [
    LabComponent,
    LabEditComponent,
    LabViewComponent,
    TestComponent,
    SearchTestComponent,
    SearchInsuranceComapnyComponent,
    LabInsuranceComponent,
    FeeScheduleComponent,
    LabInsuranceLeftNavbarComponent
  ],
  providers: [
    LabService,
    TestService,
    LabInsuranceService,
    FeeScheduleService
  ]
})

export class LabModule { }
