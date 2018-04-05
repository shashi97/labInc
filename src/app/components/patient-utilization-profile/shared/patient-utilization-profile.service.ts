import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DashboardModel } from '../../dashboard/shared/dashboard.model';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from './../../shared/models/base-data.model';
import { PatientEligibilityCriteriaModel } from '../shared/patient-utilization-profile.model';

import { ICDCodesModel } from '../../codes/icdCodes/shared/icdCodes.model';
import { ApiUrl } from '../../../shared/api.service';


@Injectable()
export class PatientUtilizationService {

  constructor(private http: Http) { }

  getPatientEligibilityCriteriaDDO(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PatientEligibilityCriteria/ddo')
      .toPromise()
    return new PromiseHandler<any>(promise);
  }

   getFrequencyTypeDDO(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'FrequencyType/ddo')
      .toPromise()
    return new PromiseHandler<any>(promise);
  }

    savePatientUtilization(data): Promise<PostObjectResponseModel<any>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'UtilizationProfile', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<any>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'UtilizationProfile', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<any>>(promise);
    }
  }

   getPatientUtilization(params): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'UtilizationProfile/list',
      { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }

  public getUtilizationProfileById(id): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'UtilizationProfile/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
 public deletePatientUtilizationById(PracticeTypeId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'UtilizationProfile/' + PracticeTypeId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }


}
