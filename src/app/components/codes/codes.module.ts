import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { codesRouting } from './codes.routing';
import { SharedComponentModule } from '../shared/shared-component.module';

import {
  ICDCodesService,
  // CPTCodesComponent,
  ICDCodesComponent,
  CPTCodesService,
  CPTCodesEditComponent,
  ICDCodesEditComponent,
  ImportCodeComponent,
  ICDCodeMappingPopupComponent,
  TestProfileEditComponent,
  TestProfileService,
  TestProfileComponent
} from './index';


@NgModule({
  imports: [
    SharedComponentModule,
    codesRouting
  ],
  declarations: [
    // CPTCodesComponent,
    ICDCodesComponent,
    CPTCodesEditComponent,
    ICDCodesEditComponent,
    TestProfileEditComponent,
    TestProfileComponent
   // ICDCodeMappingPopupComponent
    // ImportCodeComponent
  ],
  exports: [
    // CPTCodesComponent,
    ICDCodesComponent,
    CPTCodesEditComponent,
    ICDCodesEditComponent,
    TestProfileEditComponent,
    TestProfileComponent
    
  //  ICDCodeMappingPopupComponent
  ],
  providers: [
    CPTCodesService,
    ICDCodesService,
    TestProfileService
  ]
})

export class CodesModule { }
