import { NgModule } from '@angular/core';
import { salesOfficeRouting } from './sales-office.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import {
  SalesOfficeComponent,
  SalesOfficeEditComponent,
  SalesOfficeService
} from './index';

@NgModule({
  imports: [
    SharedComponentModule,
    salesOfficeRouting
  ],
  declarations: [
    SalesOfficeComponent,
    SalesOfficeEditComponent
  ],
  providers: [
    SalesOfficeService
  ]
})

export class salesOfficeModule { }
