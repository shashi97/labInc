import { NgModule } from '@angular/core';
import { OrderRouting } from './order.routing';
import { SharedComponentModule } from '../shared/shared-component.module';

import {
  OrderComponent,
  OrderEditComponent,
  OrderLeftNavbarComponent,
  OrderService,
  OrderViewComponent,
  OrderPatientEditComponent,
  OrderLogComponent,
  OrderSimulationComponent,
  OrderReviewComponent
} from './index';

@NgModule({
  imports: [
    SharedComponentModule,
    OrderRouting
  ],
  declarations: [
    OrderLeftNavbarComponent,
    OrderComponent,
    OrderEditComponent,
    OrderViewComponent,
    OrderPatientEditComponent,
    OrderLogComponent,
    OrderSimulationComponent,
    OrderReviewComponent
  ],
  providers: [
    OrderService
  ]
})

export class OrderModule { }
