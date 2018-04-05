import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  PatientEligibilityCriteriaComponent, PatientEligibilityCriteriaEditComponent
} from './index';
import {
  PatientConditionComponent,
  PatientConditionEditComponent
} from '../patient-condition/index';

import {PatientEligibilityProfileComponent, PatientUtilizationProfileEditComponent} from '../patient-utilization-profile/index';

export const PatientEligibilityCriteriaRoutes: Routes = [
  {
    path: ':moduleName/utilizationManagement',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: 'eligibilityCriteria',
        component: PatientEligibilityCriteriaComponent,
      },
      {
        path: 'eligibilityCriteria/:PatientEligibilityCriteriaId/edit',
        component: PatientEligibilityCriteriaEditComponent,
      },
      {
        path: 'eligibilityCriteria/:patientEligibilityCriteriaId/lab/:labId/edit',
        component: PatientEligibilityCriteriaEditComponent,
      },
      {
        path: 'eligibilityCriteria/:patientEligibilityCriteriaId/lab/:labId/add',
        component: PatientEligibilityCriteriaEditComponent,
      },
      {
        path: 'eligibilityCriteria/add',
        component: PatientEligibilityCriteriaEditComponent,
      },
      {
        path: 'patientCondition',
        component: PatientConditionComponent,
      },

      { path: 'patientCondition/add', component: PatientConditionEditComponent },
      { path: 'patientCondition/:patientConditionId/edit', component: PatientConditionEditComponent },

     // needs to changes
      {
        path: 'patientUtilizationProfile',
        component: PatientEligibilityProfileComponent
      },
      {
        path: 'patientUtilizationProfile/:patientUtilizationId/edit',
        component: PatientUtilizationProfileEditComponent
      },
      {
        path: 'patientUtilizationProfile/add',
        component: PatientUtilizationProfileEditComponent
      }

    ]
  }
];

export const PatientEligibilityCriteriaRouting: ModuleWithProviders = RouterModule.forChild(PatientEligibilityCriteriaRoutes);
