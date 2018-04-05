import { NgModule } from '@angular/core';
import { locationRouting } from './location.routing';
import { SharedComponentModule } from '../shared/shared-component.module';


import {
  LocationEditComponent,
  LocationComponent,
  LocationService,
  LocationLeftNavbarComponent
} from './index';


@NgModule({
  imports: [
    SharedComponentModule,
    locationRouting
  ],
  declarations: [
    LocationComponent,
    LocationEditComponent,
    LocationLeftNavbarComponent
  ],
  providers: [
    LocationService
  ]
})

export class LocationModule { }
