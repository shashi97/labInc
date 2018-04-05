import { NgModule } from '@angular/core';
import { PrescribedDrugsMenuRouting } from './prescribed-drugs.routing';
import { SharedComponentModule } from '../shared/shared-component.module';

import {
  PrescribedMedicineComponent,
  PrescribedMedicineService,
  DrugClassComponent,
  PrescribedLeftNavbarComponent,
} from './index';

@NgModule({
  imports: [
    SharedComponentModule,
    PrescribedDrugsMenuRouting
  ],
  declarations: [
    PrescribedMedicineComponent,
    DrugClassComponent,
    PrescribedLeftNavbarComponent
  ],
  exports: [

  ],
  providers: [
    PrescribedMedicineService,
  ]
})

export class PrescribedDrugsMenuModule { }
