import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  SalesOfficeComponent, SalesOfficeEditComponent
} from './index';
import {
  SalesRepresentativeComponent, SalesRepresentativeEditComponent
} from '../sales-representative/index';

export const salesOfficeRoutes: Routes = [
  {
    path: ':moduleName/salesOffice',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: SalesOfficeComponent,
      },
      {
        path: ':salesOfficeId/edit',
        component: SalesOfficeEditComponent,
      },
      {
        path: 'add',
        component: SalesOfficeEditComponent,
      },
       {
        path: 'add/:type',
        component: SalesOfficeEditComponent,
      },
      {
        path: ':salesOfficeId/salesRepresentative',
        component: SalesRepresentativeComponent,
      }
    ]
  }
];

export const salesOfficeRouting: ModuleWithProviders = RouterModule.forChild(salesOfficeRoutes);
