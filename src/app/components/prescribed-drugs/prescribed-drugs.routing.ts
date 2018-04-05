import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  PrescribedMedicineComponent,
  PrescribedMedicineService,
  DrugClassComponent,
  PrescribedLeftNavbarComponent,
} from './index';

export const PrescribedDrugsMenuRoutes: Routes = [
  {
    path: ':moduleName/drugs',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: 'prescribedDrugs', component: PrescribedMedicineComponent },
      { path: 'drugClass', component: DrugClassComponent }
    ]
  }
];

export const PrescribedDrugsMenuRouting: ModuleWithProviders = RouterModule.forChild(PrescribedDrugsMenuRoutes);
