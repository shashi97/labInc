import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  BillingCodeComponent,
  BillingCodeEditComponent,
  BillingCodeLeftNavbarComponent,
} from './index';

export const BillingCodeMenuRoutes: Routes = [
  {
    path: ':moduleName/labtest',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: 'individual', component: BillingCodeComponent },
      { path: 'individual/add', component: BillingCodeEditComponent },
      { path: 'individual/:id/edit', component: BillingCodeEditComponent },
      { path: 'group', component: BillingCodeComponent },
      { path: 'group/add', component: BillingCodeEditComponent },
      { path: 'group/:id/edit', component: BillingCodeEditComponent },
      { path: 'testingmenu', component: BillingCodeComponent },
    ]
  }
];

export const BillingCodeMenuRouting: ModuleWithProviders = RouterModule.forChild(BillingCodeMenuRoutes);
