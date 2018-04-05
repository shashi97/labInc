import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PatientEditMainComponent } from '../patient/patient-edit/patient-edit-main/patient-edit-main.component';
import { PatientViewMainComponent } from '../patient/patient-view/patient-view-main/patient-view-main.component';
import { InsuranceEditMainComponent } from '../patient/insurance/insurance-edit/insurance-edit-main/insurance-edit-main.component';
import { EmailValidateService } from './services/email-validate.component'
import {
  SearchLabComponent
} from '../../core/search-lab/search-lab.component';
import { DashboardMainComponent } from '../dashboard/dashboard-main/dashboard-main.component';
import {
  SearchPracticeComponent
} from '../../core/search-practice/search-practice.component';
import {
  SalesOfficeLeftNavbarComponent
} from '../sales-office/index';
import { CodesLeftNavbarComponent } from '../codes/codes-left-navbar/codes-left-navbar.component';
import { StateInformationComponent } from '../state-information/index';
import { ImportFileComponent, ImportFileService } from './components/import-file/index';
import {
  DropdownModule,
  DataTableModule,
  SharedModule,
  DialogModule,
  TreeTableModule,
  CalendarModule,
  CheckboxModule,
  PanelModule,
  GrowlModule,
  RadioButtonModule,
  ConfirmDialogModule,
  TreeModule,
  ButtonModule,
  MultiSelectModule,
  AccordionModule,
  DataGridModule,
  SelectButtonModule,
  MessagesModule,
  TooltipModule,
  FileUploadModule,
  OverlayPanelModule,
  ConfirmationService,
  AutoCompleteModule,
  TabViewModule,
  OrderListModule
} from 'primeng/primeng';
import { CPTCodesComponent } from '../codes/cptCodes/cptCodes-component';
import {
  ErrorComponent
} from '../../core';
import { GroupByPipe } from './pipe/groupBy.component';

import { PaginatorModule } from '../../core/paginator/paginator';

/*Directives*/
import { OnlyNumber } from './directives/number-only.directive';
import { OnlyAlphaNumeric, AlphaNumericWithExtraKey } from './directives/alpa-numeric.directive';
import { OnlyDecimalNumber } from './directives/decimal-number.directive';
import { Autosize } from './directives/auto-resize.directive';
import { OnlyEntityName } from './directives/entity-name.directive';
import { OnlyAddress } from './directives/address.directive';
import { CurrencyFormatter } from './directives/currency-format.directive';
import {
  LabLeftNavbarComponent
} from '../lab/index';
import { ImportCodeComponent } from '../codes/import-code/import-code.component';
import { InsuranceCompanyLeftNavbarComponent } from '../insurance-company/insurance-company-left-navbar/insurance-company-left-navbar.component';
import { ICDCodeMappingComponent } from '../codes/cptCodes/icdCode-mapping/icdCode-mapping.component';
import { ICDCodeMappingPopupComponent } from '../codes/cptCodes/icdCode-mapping-popup/icdCode-mapping-popup.component';
import { OrderSimulationStepComponent } from '../order/order-simulation/order-simulation-step/order-simulation-step.component';
/*Pipes*/
// import { GroupByPipe } from './shared/pipe/groupBy.component';
import {
  AccountFilterPipe,
  CurrencyPipe, FilterPipe, OrderByPipe, VendorFilterPipe, OrderByTable
} from './pipe/pipes.component';

import { PracticeLeftNavbarComponent } from '../practice';
import { TestingMenuLeftNavbarComponent } from '../testing-menu/index';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {
  PatientEligibilityCriteriaLeftNavbarComponent
} from '../patient-eligibility-criteria/index';
@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    DropdownModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    TreeTableModule,
    CalendarModule,
    CheckboxModule,
    PanelModule,
    GrowlModule,
    RadioButtonModule,
    ConfirmDialogModule,
    TreeModule,
    ButtonModule,
    MultiSelectModule,
    AccordionModule,
    DataGridModule,
    SelectButtonModule,
    MessagesModule,
    TooltipModule,
    FileUploadModule,
    AutoCompleteModule,
    AngularSvgIconModule,
    PaginatorModule,
    OverlayPanelModule,
    TabViewModule,
    CurrencyMaskModule,
    OrderListModule

  ],
  declarations: [
    ErrorComponent,
    OnlyNumber,
    Autosize,
    GroupByPipe,
    AccountFilterPipe,
    CurrencyPipe,
    FilterPipe,
    OrderByPipe,
    VendorFilterPipe,
    OrderByTable,
    SearchLabComponent,
    PracticeLeftNavbarComponent,
    SearchPracticeComponent,
    TestingMenuLeftNavbarComponent,
    AlphaNumericWithExtraKey,
    LabLeftNavbarComponent,
    PatientEditMainComponent,
    InsuranceEditMainComponent,
    OnlyAlphaNumeric,
    PatientViewMainComponent,
    OnlyDecimalNumber,
    DashboardMainComponent,
    OnlyEntityName,
    OnlyAddress,
    CurrencyFormatter,
    SalesOfficeLeftNavbarComponent,
    ImportCodeComponent,
    CodesLeftNavbarComponent,
    StateInformationComponent,
    CPTCodesComponent,
    InsuranceCompanyLeftNavbarComponent,
    ICDCodeMappingComponent,
    ICDCodeMappingPopupComponent,
    ImportFileComponent,
    OrderSimulationStepComponent,
    PatientEligibilityCriteriaLeftNavbarComponent
  ],
  providers: [
    ConfirmationService,
    EmailValidateService,
    ImportFileService
  ],
  exports: [
    OrderListModule,
    FormsModule,
    BrowserModule,
    DropdownModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    TreeTableModule,
    CalendarModule,
    CheckboxModule,
    PanelModule,
    GrowlModule,
    RadioButtonModule,
    ConfirmDialogModule,
    TreeModule,
    ButtonModule,
    MultiSelectModule,
    AccordionModule,
    DataGridModule,
    SelectButtonModule,
    MessagesModule,
    TooltipModule,
    FileUploadModule,
    AutoCompleteModule,
    TabViewModule,
    AngularSvgIconModule,
    PaginatorModule,
    SearchLabComponent,
    ErrorComponent,
    OnlyNumber,
    OnlyAlphaNumeric,
    OnlyDecimalNumber,
    Autosize,
    GroupByPipe,
    AccountFilterPipe,
    CurrencyPipe,
    FilterPipe,
    OrderByPipe,
    VendorFilterPipe,
    OrderByTable,
    PracticeLeftNavbarComponent,
    SearchPracticeComponent,
    TestingMenuLeftNavbarComponent,
    LabLeftNavbarComponent,
    PatientEditMainComponent,
    InsuranceEditMainComponent,
    PatientViewMainComponent,
    OnlyEntityName,
    OnlyAddress,
    CurrencyFormatter,
    AlphaNumericWithExtraKey,
    OnlyAddress,
    SalesOfficeLeftNavbarComponent,
    ImportCodeComponent,
    CodesLeftNavbarComponent,
    StateInformationComponent,
    CurrencyMaskModule,
    CPTCodesComponent,
    InsuranceCompanyLeftNavbarComponent,
    ICDCodeMappingComponent,
    ICDCodeMappingPopupComponent,
    ImportFileComponent,
    OrderSimulationStepComponent,
    PatientEligibilityCriteriaLeftNavbarComponent
  ]
})
export class SharedComponentModule { }
