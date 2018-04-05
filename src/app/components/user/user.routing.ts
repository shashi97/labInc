import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import { UserComponent, UserEditComponent, UserViewComponent } from './index';

export const userRoutes: Routes = [
  {
    path: ':moduleName/user',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: UserComponent,
      },
      {
        path: ':id/view',
        component: UserViewComponent,
      },
      {
        path: ':id/edit',
        component: UserEditComponent,
      },
      {
        path: 'add',
        component: UserEditComponent,
      }
    ]
  }
];

export const userRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);
