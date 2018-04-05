import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { PatientModel, PatientPermission } from './patient.model';
import { ICDCodesModel } from '../icdCodes/shared/icdCodes.model'
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from './../../shared/models/base-data.model';

import { ApiUrl } from '../../../shared/api.service';


@Injectable()
export class ICDCodesService {

  constructor(private http: Http) { }

  getICDCodes(params): Promise<ObjectResponseModel<BaseDataModel<ICDCodesModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'ICD10Code/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<ICDCodesModel>>>(promise);
  }

  getICDCodeById(id: number): Promise<ObjectResponseModel<ICDCodesModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'ICD10Code/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<ICDCodesModel>>(promise);
  }

  addICD10CodesFromExcel(file): Promise<PostObjectResponseModel<ICDCodesModel>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'ICD10Code/upload', JSON.stringify(file))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<ICDCodesModel>>(promise);
  }

  public getICDCodeBySearch(SearchString: string): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'ICD10Code/search?code='+ SearchString)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }

  saveICDCodes(data): Promise<PostObjectResponseModel<ICDCodesModel>> {
    if (data.id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'ICD10Code', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<ICDCodesModel>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'ICD10Code', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<ICDCodesModel>>(promise);
    }
  }

  public deleteICDCodeById(id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'ICD10Code/delete/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
}
