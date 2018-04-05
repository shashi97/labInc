import { NgModule } from '@angular/core';
import { TestingMenuRouting } from './testing-menu.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import { TestModalityComponent,TestModalityService } from '../../components/test-modality/index';
import { TestClassTypeComponent,TestClassService } from '../../components/test-class-type/index';
import { DrugFamilyComponent,DrugFamilyService } from './drug-family/index';
import {
  GroupTestComponent,
  GroupTestEditComponent,
  GroupTestService,
  TestingMenuComponent,
  TestingMenuEditComponent,
  TestingMenuService,
  TestBillingCodeEditComponent,
  TestBillingCodeComponent,
  ImportExcelComponent,
 
} from './index';




@NgModule({
  imports: [
    SharedComponentModule,
    TestingMenuRouting
  ],
  declarations: [
    GroupTestComponent,
    GroupTestEditComponent,
    TestingMenuComponent,
    TestingMenuEditComponent,
    TestBillingCodeEditComponent,
    TestBillingCodeComponent,
    ImportExcelComponent,
    TestModalityComponent,
    TestClassTypeComponent,
    DrugFamilyComponent,
   
  ],
  providers: [
    GroupTestService,
    TestingMenuService,
    TestModalityService,
    TestClassService,
    DrugFamilyService,
    
  ]
})

export class TestingMenuModule { }
