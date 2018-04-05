import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  GroupTestComponent,
  GroupTestEditComponent,
  TestingMenuComponent,
  TestingMenuEditComponent,
  TestBillingCodeEditComponent,
  TestBillingCodeComponent
  
} from './index';
import { TestModalityComponent } from '../../components/test-modality/index';
import { TestClassTypeComponent } from '../../components/test-class-type/index';
import { DrugFamilyComponent } from './drug-family/index';
import { DrugClassComponent } from '../prescribed-drugs/index';

export const TestingMenuRoutes: Routes = [
  {
    path: ':moduleName/testingMenu',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path: 'testItem', component: TestingMenuComponent },
      { path: 'testItem/:id/edit', component: TestingMenuEditComponent },
      { path: 'testItem/add', component: TestingMenuEditComponent },

      { path: 'groupTest', component: GroupTestComponent, },
      { path: 'groupTest/add', component: GroupTestEditComponent, },
      { path: 'groupTest/:id/edit', component: GroupTestEditComponent, },

      { path: 'testCodeMapping', component: TestBillingCodeComponent },
      { path: 'testCodeMapping/add', component: TestBillingCodeEditComponent },
      { path: 'testCodeMapping/:id/edit', component: TestBillingCodeEditComponent },

      { path: 'drugClass', component: DrugClassComponent },

      { path: 'testModality', component: TestModalityComponent },
      { path: 'testClassType', component: TestClassTypeComponent },
      { path: 'drugFamily', component: DrugFamilyComponent },
      
      
    ]
  }
];

export const TestingMenuRouting: ModuleWithProviders = RouterModule.forChild(TestingMenuRoutes);
