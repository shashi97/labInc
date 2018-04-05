import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { SharedComponentModule } from './components/shared/shared-component.module';
import { PatientModule } from './components/patient/patient.module';
import { OrderModule } from './components/order/order.module';
import { PhysicianModule } from './components/physician/physician.module';
import { InsuranceModule } from './components/insurance-company/insurance-company.module';
import { LabModule } from './components/lab/lab.module';
import { PracticeModule } from './components/practice/practice.module';
import { UserModule } from './components/user/user.module';
import { CodesModule } from './components/codes/codes.module';
import { BillingCodeMenuModule } from './components/billing-code/billing-code.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

import { PrescribedDrugsMenuModule } from './components/prescribed-drugs/prescribed-drugs.module';
import { salesRepresentativeModule } from './components/sales-representative/sales-representative.module';
import { salesOfficeModule } from './components/sales-office/sales-office.module';
import { labDirectorModule } from './components/lab-director/lab-director.module';
import { StateInformationService } from './components/state-information/index';
import {
  SetupComponent,
  SetupEditComponent,
  SetupService
} from './components/setup/shared';

import { LabContractModule } from './components/lab-contract/lab-contract.module';
import { PatientEligibilityCriteriaModule } from './components/patient-eligibility-criteria/patient-eligibility-criteria.module';
import { LocationModule } from './components/location/location.module';

import { TestingMenuModule } from './components/testing-menu/testing-menu.module';

import {PatientEligibilityProfileModule} from './components/patient-utilization-profile/patient-utilization-profile.module';

import {
  ApiUrl,
  RouteService
} from './shared';
import { PaginationService } from './shared/pagination.service';

import { MasterService, TruncatePipe } from './components/shared';

import {
  LoginComponent, FooterComponent,
  HeaderComponent, HomeComponent, TopNavbarComponent,
  AlertService, AuthenticationService, httpFactory, BreadcrumbsService, LocalStorageService,
  CommonService
} from './core';


import { AlertComponent, AuthGuard } from './components/shared';

import {
  ForgotPasswordComponent
} from './core/forgot/forgot.component';

import {
  ResetPasswordComponent
} from './core/reset-password/reset-password.component';

import { TabViewModule, TooltipModule } from 'primeng/primeng';

// import {SlimScroll} from 'ng2-slimscroll';
import { SlimScrollModule } from 'ng2-slimscroll';
import { CKEditorModule } from 'ng2-ckeditor';

/*Loading*/
import { LoaderService } from './core/loader/loader.service';
import { ErrorService } from './core/error/error.service';
import { LoaderComponent } from './core/loader/loader.component';
// import { CustomizeLoaderComponent } from './core/customize-loader/customizeLoader.component';
// import { CustomizeLoaderService } from './core/customize-loader/customizeLoader.service';
// import { OnlyNumber } from './components/shared/directives/number.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    TopNavbarComponent,
    HomeComponent,
    /*Loader*/
    LoaderComponent,
   // CustomizeLoaderComponent,
    /* reset password module */
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SetupComponent,
    SetupEditComponent,
    
    // OnlyNumber,

    /*Graph */

    TruncatePipe,

    PageNotFoundComponent

  ],
  imports: [
    TabViewModule,
    TooltipModule,
    BrowserAnimationsModule,
    HttpModule,
    routing,
    SlimScrollModule,
    CKEditorModule,
    SharedComponentModule,
    PatientModule,
    OrderModule,
    PhysicianModule,
    CodesModule,
    InsuranceModule,
    LabModule,
    LabContractModule,
    PracticeModule,
    UserModule,
    LocationModule,
    TestingMenuModule,
    BillingCodeMenuModule,
    PrescribedDrugsMenuModule,
    DashboardModule,
    salesOfficeModule,
    salesRepresentativeModule,
    labDirectorModule,
    PatientEligibilityCriteriaModule,
    PatientEligibilityProfileModule

  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, ApiUrl, Router, LoaderService, ErrorService, LocalStorageService]
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    AlertService,
    CommonService,
    AuthenticationService,
    ApiUrl,
    RouteService,
    BreadcrumbsService,
    LocalStorageService,
    MasterService,
    PaginationService,
    LoaderService,
  //  CustomizeLoaderService,
    ErrorService,
    SetupService,
    StateInformationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
