import { NgModule } from '@angular/core';
import { labDirectorRouting } from './lab-director.routing';
import { SharedComponentModule } from '../shared/shared-component.module';
import {
  LabDirectorComponent,
  LabDirectorEditComponent,
  LabDirectorService,
  LabDirectorLeftNavbarComponent
} from './index';

@NgModule({
  imports: [
    SharedComponentModule,
    labDirectorRouting
  ],
  declarations: [
    LabDirectorComponent,
    LabDirectorEditComponent,
    LabDirectorLeftNavbarComponent
  ],
  providers: [
    LabDirectorService
  ]
})

export class labDirectorModule { }
