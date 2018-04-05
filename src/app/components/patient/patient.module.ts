import { NgModule } from '@angular/core';
import { patientRouting } from './patient.routing';
import { SharedComponentModule } from '../shared/shared-component.module';

import {
  PatientComponent,
  PatientEditComponent,
  PatientLeftNavbarComponent,
  PatientService,
  PatientViewComponent,
  InsuranceComponent,
  InsuranceEditComponent,
  InsuranceService
 // PatientEditMainComponent
} from './index';


@NgModule({
  imports: [
    SharedComponentModule,
    patientRouting
  ],
  declarations: [
    PatientLeftNavbarComponent,
    PatientViewComponent,
    PatientComponent,
    PatientEditComponent,
    InsuranceComponent,
    InsuranceEditComponent
   // PatientEditMainComponent
  ],
  exports: [
   //  PatientEditComponent
  ],
  providers: [
    InsuranceService,
    PatientService
  ]
})

export class PatientModule { }
