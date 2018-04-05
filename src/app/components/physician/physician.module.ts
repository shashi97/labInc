import { NgModule } from '@angular/core';
import { PhysicianRouting } from './Physician.routing';
import { SharedComponentModule } from '../shared/shared-component.module';

import {
  PhysicianComponent,
  PhysicianEditComponent,
  PhysicianLeftNavbarComponent,
  PhysicianService,
  PhysicianSpecialityComponent,
  PhysicianSpecialityLeftNavbarComponent
} from './';


@NgModule({
  imports: [
    SharedComponentModule,
    PhysicianRouting
  ],
  declarations: [
    PhysicianLeftNavbarComponent,
    PhysicianComponent,
    PhysicianEditComponent,
    PhysicianSpecialityComponent,
    PhysicianSpecialityLeftNavbarComponent
  ],
  exports: [
    PhysicianLeftNavbarComponent,
    PhysicianComponent,
    PhysicianEditComponent,
    PhysicianSpecialityComponent,
    PhysicianSpecialityLeftNavbarComponent
  ],
  providers: [
    PhysicianService
  ]
})

export class PhysicianModule { }
