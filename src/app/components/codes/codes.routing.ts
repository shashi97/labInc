import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';

import {
  CPTCodesComponent,
  ICDCodesComponent,
  CPTCodesEditComponent,
  ICDCodesEditComponent,
  ICDCodeMappingComponent,
  TestProfileEditComponent,
  TestProfileComponent
} from './index';

export const codesRoutes: Routes = [
  {
    path: ':moduleName/codes',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: CPTCodesComponent,
      },
      {
        path: 'cpt',
        component: CPTCodesComponent,
      },
      {
        path: 'icdCodeMapping/:id',
        component: ICDCodeMappingComponent,
      },
      {
        path: 'icd',
        component: ICDCodesComponent,
      },
      {
        path: 'cpt/:id/edit',
        component: CPTCodesEditComponent,
      },
      {
        path: 'icd/:id/edit',
        component: ICDCodesEditComponent,
      },

      {
        path: 'coverageDeterminationProfile',
        component: TestProfileComponent
      },

      {
        path: 'coverageDeterminationProfile/:id/edit',
        component: TestProfileEditComponent
      },

      {
        path: 'coverageDeterminationProfile/:id/add',
        component: TestProfileEditComponent
      },

    ]
  }
];

export const codesRouting: ModuleWithProviders = RouterModule.forChild(codesRoutes);
