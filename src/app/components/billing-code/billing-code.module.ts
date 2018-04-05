import { NgModule } from '@angular/core';
import { BillingCodeMenuRouting } from './billing-code.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import {
  BillingCodeComponent,
  BillingCodeEditComponent,
  BillingCodeLeftNavbarComponent,
  BillingCodeService
} from './index';


@NgModule({
  imports: [
    SharedComponentModule,
    BillingCodeMenuRouting
  ],
  declarations: [
    BillingCodeComponent,
    BillingCodeEditComponent,
    BillingCodeLeftNavbarComponent,
  ],
  providers: [
    BillingCodeService
  ]
})

export class BillingCodeMenuModule { }
