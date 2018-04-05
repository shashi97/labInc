import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DrugFamilyModel } from './drug-family.model';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from '../../../shared/models/base-data.model';

import { ApiUrl } from '../../../../shared/api.service';


@Injectable()
export class DrugFamilyService {

  constructor(private http: Http) { }
  getDrugFamily(params): Promise<ObjectResponseModel<BaseDataModel<DrugFamilyModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'DrugFamily/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<DrugFamilyModel>>>(promise);
  }

  // public getInsuranceById(patientId): Promise<ObjectResponseModel<DrugFamilyModel>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'DrugFamily/' + patientId)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<DrugFamilyModel>>(promise);
  // }

  saveDrugFamily(data): Promise<PostObjectResponseModel<DrugFamilyModel>> {
    let url = ApiUrl.MAIN_URI + 'DrugFamily';
    let promise = null;
    if (data.Id > 0) {
      promise = this.http
        .put(url, JSON.stringify(data))
        .toPromise();
    } else {
      promise = this.http
        .post(url, JSON.stringify(data))
        .toPromise();
    }
    return new PromiseHandler<PostObjectResponseModel<DrugFamilyModel>>(promise);
  }
  public deleteDrugFamilyById(DrugFamilyId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'DrugFamily/' + DrugFamilyId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
  public getDrugFamilysDDO(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'DrugFamily/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }

 
}
