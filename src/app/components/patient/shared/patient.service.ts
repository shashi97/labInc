import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PatientModel } from './patient.model';
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
export class PatientService {

  constructor(private http: Http) { }

  getPatients(params): Promise<ObjectResponseModel<BaseDataModel<PatientModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Patient/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<PatientModel>>>(promise);
  }

  public getPatientById(patientId): Promise<ObjectResponseModel<PatientModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Patient/getPatientAndPatientGuarantorInfo/' + patientId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<PatientModel>>(promise);
  }

    public getPatientNameByPatientId(patientId): Promise<ObjectResponseModel<PatientModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Patient/getPatientAndPatientGuarantorInfo/' + patientId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<PatientModel>>(promise);
  }

  public getRelationshipList(): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Patient/list')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }

  public getGuarantorRelation(): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Relation/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }
  public getInsuranceBySearch(SearchString): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/searchByCodeOrName?codeOrName=' + SearchString)

      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  

  savePatient(data): Promise<PostObjectResponseModel<PatientModel>> {
    let url = ApiUrl.MAIN_URI + 'Patient';
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
    return new PromiseHandler<PostObjectResponseModel<PatientModel>>(promise);
  }

  public deletePatientById(roleId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'Patient/' + roleId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
}
