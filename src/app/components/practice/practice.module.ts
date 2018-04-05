import { NgModule } from '@angular/core';
import { practiceRouting } from './practice.routing';
import { SharedComponentModule } from '../shared/shared-component.module';

import {
  PracticeComponent,
  PracticeEditComponent,
  PracticeService,
  PracticeViewComponent,
  PracticeTypeComponent,
  PracticeTypeLeftNavbarComponent
} from './index';


@NgModule({
  imports: [
    SharedComponentModule,
    practiceRouting
  ],
  declarations: [
    PracticeComponent,
    PracticeEditComponent,
    PracticeViewComponent,
    PracticeTypeComponent,
    PracticeTypeLeftNavbarComponent
  ],
  providers: [
    PracticeService
  ]
})

export class PracticeModule { }
