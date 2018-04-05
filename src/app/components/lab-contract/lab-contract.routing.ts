import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderViewComponent } from '../order/order-view/order-view.component'

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  LabContractComponent,
  ContractLabComponent,
  ContractDocmentComponent,
  LabOrderComponent,
  OrderGraphComponent
} from './index';

export const labContractRoutes: Routes = [
  {
    path: ':moduleName/labContract',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LabContractComponent,
      },
      {
        path: 'contractLab',
        component: ContractLabComponent,
      },
      {
        path: ':labContractId/laborder/:contractLabId',
        component: LabOrderComponent,
      },
      {
        path: 'graph',
        component: OrderGraphComponent,
      },
      {
        path: ':labContractId/contractdocument/:contractLabId',
        component: ContractDocmentComponent,
      },
      {
        path: ':labContractId/contractLab/:contractLabId',
        component: ContractLabComponent,
      },
      {
        path: ':labContractId/laborder/:contractLabId/order/:id/view',
        component: OrderViewComponent,
      },
    ]
  }
];

export const labContractRouting: ModuleWithProviders = RouterModule.forChild(labContractRoutes);
