import { NgModule } from '@angular/core';
import { salesRepresentativeRouting } from './sales-representative.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import {
  SalesRepresentativeComponent,
  SalesRepresentativeEditComponent,
  SalesRepresentativeService,
  SalesRepresentativeLeftNavbarComponent
} from './index';

@NgModule({
  imports: [
    SharedComponentModule,
    salesRepresentativeRouting
  ],
  declarations: [
    SalesRepresentativeComponent,
    SalesRepresentativeEditComponent,
    SalesRepresentativeLeftNavbarComponent
  ],
  providers: [
    SalesRepresentativeService
  ]
})

export class salesRepresentativeModule { }
