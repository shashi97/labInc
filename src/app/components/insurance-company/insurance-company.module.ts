import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { insuranceCompanyRouting } from './insurance-company.routing';
import { SharedComponentModule } from '../shared/shared-component.module';

import {
  InsuranceCompanyEditComponent,
  InsuranceCompanyService,
  InsuranceCompanyViewComponent,
  InsuranceCompanyComponent,
  InsuranceCompanyTypeComponent,
  InsuranceCptCodeComponent,
  InsuranceIcdCodeMappingComponent,
  InsuranceCompanyGcodeComponent,
  InsuranceCompanyGcodeEditComponent,
  TradingPartnerComponent,
  TradingPartnerService,
  InsuranceSimulationComponent,
  InsuranceSimulationFilter
} from './index';


@NgModule({
  imports: [
    SharedComponentModule,
    insuranceCompanyRouting
  ],
  declarations: [
    InsuranceCompanyEditComponent,
    InsuranceCompanyViewComponent,
    InsuranceCompanyComponent,
    InsuranceCompanyTypeComponent,
    InsuranceCptCodeComponent,
    InsuranceIcdCodeMappingComponent,
    InsuranceCompanyGcodeComponent,
    InsuranceCompanyGcodeEditComponent,
    TradingPartnerComponent,
    InsuranceSimulationComponent,
    InsuranceSimulationFilter
  ],
  exports: [
    InsuranceSimulationComponent
  ],
  providers: [
    InsuranceCompanyService,
    TradingPartnerService
  ]
})

export class InsuranceModule { }
