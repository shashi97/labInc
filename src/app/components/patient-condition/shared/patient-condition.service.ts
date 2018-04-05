import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PatientConditionModel } from './patient-condition.model';
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
export class PatientConditionService {

  constructor(private http: Http) { }
  getPatientCondition(params): Promise<ObjectResponseModel<BaseDataModel<PatientConditionModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PatientCondition/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<PatientConditionModel>>>(promise);
  }

  // public getInsuranceById(patientId): Promise<ObjectResponseModel<PatientConditionModel>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'PatientCondition/' + patientId)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<PatientConditionModel>>(promise);
  // }

  getPracticeType(): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PracticeType/list')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }
  public getICDCodeBySearch(SearchString: string): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'ICD10Code/search?code='+ SearchString)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }
  public getPracticeTypeOnSerach(SearchString: string): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PracticeType/search?name='+ SearchString)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }
  savePatientCondition(data): Promise<PostObjectResponseModel<PatientConditionModel>> {
    let url = ApiUrl.MAIN_URI + 'PatientCondition';
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
    return new PromiseHandler<PostObjectResponseModel<PatientConditionModel>>(promise);
  }
  public deletePatientConditionById(PatientConditionId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'PatientCondition/' + PatientConditionId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
  public getPatientConditionById(PatientConditionId: number): Promise<ObjectResponseModel<PatientConditionModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PatientCondition/info/' + PatientConditionId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<PatientConditionModel>>(promise);
  }
  public getPatientConditionsDDO(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PatientCondition/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }

 
}
