import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LabOrderComponent} from '../lab-contract/lab-order/lab-order.component'
import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  OrderComponent,
  OrderEditComponent,
  OrderViewComponent,
  OrderLogComponent,
  OrderSimulationComponent,
  OrderReviewComponent
} from './index';

export const orderRoutes: Routes = [
  {
    path: ':moduleName/order',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: OrderComponent,
      },
      {
        path: 'lab',
        component: OrderComponent,
      },
      {
        path: ':id/edit',
        component: OrderEditComponent,
      },
      {
        path: ':id/:orderNumber/view',
        component: OrderViewComponent,
      },
      {
        path: ':orderState/:id/:orderNumber/view',
        component: OrderViewComponent,
      },
      {
        path: 'add',
        component: OrderEditComponent,
      },
        {
        path: 'orderSimulation',
        component: OrderSimulationComponent,
      },
      {
        path: 'add/:patientId',
        component: OrderEditComponent,
      },
      {
        path: ':labContractId/laborder/:contractLabId',
        component: LabOrderComponent,
      },
      {
        path: 'orderlog/:orderNumber/:id',
        component: OrderLogComponent,
      },
        {
        path: 'orderReview',
        component: OrderReviewComponent,
      },
    ]
  }
];

export const OrderRouting: ModuleWithProviders = RouterModule.forChild(orderRoutes);
