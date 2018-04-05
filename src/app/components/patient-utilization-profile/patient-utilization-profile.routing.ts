import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  PatientEligibilityProfileComponent
} from './index';


export const PatientUtilizationProfileRoutes: Routes = [
  {
    path: ':moduleName/patientUtilizationProfile',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PatientEligibilityProfileComponent,
      }
    ]
  }
];

export const PatientUtilizationProfileRouting: ModuleWithProviders = RouterModule.forChild(PatientUtilizationProfileRoutes);
