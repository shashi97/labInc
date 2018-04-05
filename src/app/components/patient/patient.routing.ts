import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  PatientComponent,
  PatientEditComponent,
  PatientViewComponent,
  InsuranceComponent,
  InsuranceEditComponent
} from './index'

export const patientRoutes: Routes = [
  {
    path: ':moduleName/patient',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PatientComponent,
      },
      {
        path: 'add',
        component: PatientEditComponent,
      },
      {
        path: ':type/add',
        component: PatientEditComponent,
      },
      {
        path: ':id/view',
        component: PatientViewComponent,
      },
      {
        path: ':id/edit',
        component: PatientEditComponent,
      },
      {
        path: ':patientId/insurance',
        component: InsuranceComponent,
      },
      {
        path: ':patientId/insurance/:id/edit',
        component: InsuranceEditComponent,
      },
      {
        path: ':patientId/insurance/add',
        component: InsuranceEditComponent,
      }

    ]
  }
];

export const patientRouting: ModuleWithProviders = RouterModule.forChild(patientRoutes);
