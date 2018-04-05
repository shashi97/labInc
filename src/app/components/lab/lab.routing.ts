import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  LabComponent, LabEditComponent, LabViewComponent, TestComponent,
  SearchTestComponent, LabInsuranceComponent, FeeScheduleComponent
} from './index';
import {
  UserComponent,
  UserEditComponent,
  UserLeftNavbarComponent,
  UserService,
  UserViewComponent
} from '../user/index';
import {LabDirectorComponent} from '../lab-director/lab-director.component'
export const labRoutes: Routes = [
  {
    path: ':moduleName/lab',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LabComponent,
      },
      {
        path: ':labId/view',
        component: LabViewComponent,
      },
      {
        path: ':labId/edit',
        component: LabEditComponent,
      },
      {
        path: 'add',
        component: LabEditComponent,
      },
      {
        path: 'test',
        component: TestComponent,
      },
      {
        path: 'labinsurance',
        component: LabInsuranceComponent,
      },
      {
        path: ':labInsuranceId/feeSchedule',
        component: FeeScheduleComponent,
      },
      {
        path: ':labId/user',
        component: UserComponent,
      },
      {
        path: ':labId/user/add',
        component: UserEditComponent,
      },
      {
        path: ':labId/user/:id/edit',
        component: UserEditComponent,
      },
      {
        path: ':labId/labdirector',
        component: LabDirectorComponent
      }
    ]
  }
];

export const labRouting: ModuleWithProviders = RouterModule.forChild(labRoutes);
