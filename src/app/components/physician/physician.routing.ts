import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import { PhysicianComponent } from './Physician.component';
import { PhysicianEditComponent } from './Physician-edit/Physician-edit.component';
import { PhysicianSpecialityComponent } from './physician-speciality/physician-speciality.component';
export const PhysicianRoutes: Routes = [
  {
    path: ':moduleName/physician',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PhysicianComponent,
      },
      {
        path: ':id/edit',
        component: PhysicianEditComponent,
      },
      {
        path: 'add',
        component: PhysicianEditComponent,
      },
      {
        path: 'speciality',
        component: PhysicianSpecialityComponent,
      }
    ]
  }
];

export const PhysicianRouting: ModuleWithProviders = RouterModule.forChild(PhysicianRoutes);
