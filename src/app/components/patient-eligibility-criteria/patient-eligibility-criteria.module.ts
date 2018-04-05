import { NgModule } from '@angular/core';
import { PatientEligibilityCriteriaRouting } from './patient-eligibility-criteria.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import {
  PatientEligibilityCriteriaComponent,
  PatientEligibilityCriteriaEditComponent,
  PatientEligibilityCriteriaService
} from './index';
import {
  PatientConditionComponent,
  PatientConditionLeftNavbarComponent,
  PatientConditionService,
  PatientConditionEditComponent
} from '../patient-condition/index';

@NgModule({
  imports: [
    SharedComponentModule,
    PatientEligibilityCriteriaRouting
  ],
  declarations: [
    PatientEligibilityCriteriaComponent,
    PatientEligibilityCriteriaEditComponent,
    PatientConditionComponent,
    PatientConditionLeftNavbarComponent,    
    PatientConditionEditComponent
  ],
  providers: [
    PatientEligibilityCriteriaService,
    PatientConditionService
  ]
})

export class PatientEligibilityCriteriaModule { }
