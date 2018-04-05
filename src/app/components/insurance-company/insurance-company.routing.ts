import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/guards';
import { HomeComponent } from '../../core/home/home.component';
import {
  InsuranceCompanyEditComponent,
  InsuranceCompanyViewComponent,
  InsuranceCompanyComponent,
  InsuranceCompanyTypeComponent,
  InsuranceIcdCodeMappingComponent,
  InsuranceCptCodeComponent,
  InsuranceCompanyGcodeComponent,
  InsuranceCompanyGcodeEditComponent,
  TradingPartnerComponent,
  InsuranceSimulationComponent
} from './';
import { PatientEligibilityCriteriaEditComponent } from '../patient-eligibility-criteria/patient-eligibility-criteria-edit/patient-eligibility-criteria-edit.component';
import { PatientEligibilityCriteriaComponent } from '../patient-eligibility-criteria/patient-eligibility-criteria.component';
export const insuranceCompanyRoutes: Routes = [
  {
    path: ':moduleName/insurance',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: 'companies',
        component: InsuranceCompanyComponent,
      },
      {
        path: 'gcCodes',
        component: InsuranceCompanyGcodeComponent,
      },
      {
        path: 'view',
        component: InsuranceCompanyViewComponent,
      },
      {
        path: ':id/edit',
        component: InsuranceCompanyEditComponent,
      },
      {
        path: ':insuranceCompanyId/gcCodes',
        component: InsuranceCompanyGcodeEditComponent,
      },
      {
        path: 'add',
        component: InsuranceCompanyEditComponent,
      },
      {
        path: 'gcCodes/add',
        component: InsuranceCompanyGcodeEditComponent,
      },
      {
        path: ':insuranceCompanyId/cpt',
        component: InsuranceCptCodeComponent,
      },
      {
        path: 'icdCodeMapping/:id/:insuranceCompanyId',
        component: InsuranceIcdCodeMappingComponent,
      },
      {
        path: ':insuranceCompanyId/icdCodeMapping',
        component: InsuranceIcdCodeMappingComponent,
      },
      {
        path: 'type',
        component: InsuranceCompanyTypeComponent
      },
      {
        path: ':insuranceCompanyId/utilizationManagement',
        component: PatientEligibilityCriteriaComponent,
      },
      {
        path: ':insuranceCompanyId/utilizationManagement/add',
        component: PatientEligibilityCriteriaEditComponent,
      },
      {
        path: ':insuranceCompanyId/utilizationManagement/:PatientEligibilityCriteriaId/edit',
        component: PatientEligibilityCriteriaEditComponent,
      },
      {
        path: 'insuranceSimulation',
        component: InsuranceSimulationComponent,
      },
      {
        path: 'tradingPartner',
        component: TradingPartnerComponent,
      }
    ]
  }
];

export const insuranceCompanyRouting: ModuleWithProviders = RouterModule.forChild(insuranceCompanyRoutes);
