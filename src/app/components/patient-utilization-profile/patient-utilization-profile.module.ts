import { NgModule } from '@angular/core';
import { PatientEligibilityProfileComponent,
  PatientUtilizationProfileEditComponent
   } from './index';
import { SharedComponentModule } from '../shared/shared-component.module';
import {

} from './index';

import {PatientUtilizationService} from './shared/patient-utilization-profile.service';

import {PatientUtilizationProfileRouting} from './patient-utilization-profile.routing';

@NgModule({
  imports: [
    SharedComponentModule,
    PatientUtilizationProfileRouting
  ],
  declarations: [
    PatientEligibilityProfileComponent,
    PatientUtilizationProfileEditComponent
  ],
  providers: [
    PatientUtilizationService
  ]
})

export class PatientEligibilityProfileModule { }
