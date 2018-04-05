import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  SalesRepresentativeComponent, SalesRepresentativeEditComponent
} from './index';
import {
  UserComponent,
  UserEditComponent,
  UserLeftNavbarComponent,
  UserService,
  UserViewComponent
} from '../user/index';

export const salesRepresentativeRoutes: Routes = [
  {
    path: ':moduleName/salesRepresentative',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: SalesRepresentativeComponent,
      },
      {
        path: ':salesRepresentativeId/edit',
        component: SalesRepresentativeEditComponent,
      },
      {
        path: 'add',
        component: SalesRepresentativeEditComponent,
      },
      {
        path: ':salesRepresentativeId/user',
        component: UserComponent,
      },
      {
        path: ':salesRepresentativeId/user/add',
        component: UserEditComponent,
      },
      {
        path: ':salesRepresentativeId/user/:id/edit',
        component: UserEditComponent,
      }
    ]
  }
];

export const salesRepresentativeRouting: ModuleWithProviders = RouterModule.forChild(salesRepresentativeRoutes);
