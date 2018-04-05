import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import { LocationComponent, LocationEditComponent } from './index';

export const locationRoutes: Routes = [
  {
    path: ':moduleName/location',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LocationComponent,
      },
      {
        path: 'add',
        component: LocationEditComponent,
      },
      {
        path: ':id/edit',
        component: LocationEditComponent,
      },


      //   {
      //   path: '',
      //   component: PhysicianComponent,
      // },
      // {
      //   path: ':id/edit',
      //   component: PhysicianEditComponent,
      // },
      // {
      //   path: 'add',
      //   component: PhysicianEditComponent,
      // }
    ]
  }
];
export const locationRouting: ModuleWithProviders = RouterModule.forChild(locationRoutes);