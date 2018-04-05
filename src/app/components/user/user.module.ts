import { NgModule } from '@angular/core';
import { userRouting } from './user.routing';
import { SharedComponentModule } from '../shared/shared-component.module';

import {
  UserComponent,
  UserEditComponent,
  UserLeftNavbarComponent,
  UserService,
  UserViewComponent,
  SearchSalesOfficeComponent
} from './index';


@NgModule({
  imports: [
    SharedComponentModule,
    userRouting
  ],
  declarations: [
    UserComponent,
    UserEditComponent,
    UserViewComponent,
    UserLeftNavbarComponent,
    SearchSalesOfficeComponent
  ],
  providers: [
    UserService
  ]
})

export class UserModule { }
