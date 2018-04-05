import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  PracticeComponent,
  PracticeEditComponent,
  PracticeViewComponent,
  PracticeTypeComponent
} from './index';

import {
  PhysicianComponent,
  PhysicianEditComponent
} from '../physician'

import {
  LocationEditComponent,
  LocationComponent
} from '../location';

import { UserComponent, UserEditComponent } from '../user';


export const practiceRoutes: Routes = [
  {
    path: ':moduleName/practice',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PracticeComponent,
      },
      {
        path: ':id/view',
        component: PracticeViewComponent,
      },
      {
        path: ':id/edit',
        component: PracticeEditComponent,
      },
      {
        path: 'add',
        component: PracticeEditComponent,
      },
      {
        path: ':practiceId/physician',
        component: PhysicianComponent,
      },
      {
        path: ':practiceId/physician/add',
        component: PhysicianEditComponent,
      },
      {
        path: ':practiceId/physician/:id/edit',
        component: PhysicianEditComponent,
      },
      {
        path: ':practiceId/location',
        component: LocationComponent,
      },
      {
        path: ':practiceId/location/add',
        component: LocationEditComponent,
      },
      {
        path: ':practiceId/location/:id/edit',
        component: LocationEditComponent,
      },
      {
        path: ':practiceId/location/:id/add',
        component: LocationEditComponent,
      },
      {
      path: ':practiceId/:labId/user',
        component: UserComponent,
      },
      {
        path: ':practiceId/:labId/user/:id/edit',
        component: UserEditComponent,
      },
      {
        path: ':practiceId/user/:labId/add',
        component: UserEditComponent,
      },
      {
        path: 'type',
        component: PracticeTypeComponent,
      }

    ]
  }
];

export const practiceRouting: ModuleWithProviders = RouterModule.forChild(practiceRoutes);
