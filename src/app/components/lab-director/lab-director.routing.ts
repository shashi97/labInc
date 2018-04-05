import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  LabDirectorComponent, LabDirectorEditComponent
} from './index';


export const labDirectorRoutes: Routes = [
  {
    path: ':moduleName/labDirector',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LabDirectorComponent,
      },
      {
        path: ':labDirectorId/edit',
        component: LabDirectorEditComponent,
      },
      {
        path: ':labDirectorId/lab/:labId/edit',
        component: LabDirectorEditComponent,
      },
       {
        path: ':labDirectorId/lab/:labId/add',
        component: LabDirectorEditComponent,
      },
      {
        path: 'add',
        component: LabDirectorEditComponent,
      }
    ]
  }
];

export const labDirectorRouting: ModuleWithProviders = RouterModule.forChild(labDirectorRoutes);
