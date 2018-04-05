import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { OrderModule } from '../../components/order/order.module';
import { PatientModule } from '../../components/patient/patient.module';
@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    OrderModule,
    PatientModule
    // AgGridModule.withComponents([])
  ],
  exports: [
    FormsModule,
    BrowserModule,
    PatientModule,
    OrderModule
  ]
})
export class RootModule { }