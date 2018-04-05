import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PatientEligibilityCriteriaModel } from './patient-eligibility-criteria.model';
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
export class PatientEligibilityCriteriaService {

  constructor(private http: Http) { }

  getPatientEligibilityCriterias(params): Promise<ObjectResponseModel<BaseDataModel<PatientEligibilityCriteriaModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PatientEligibilityCriteria/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<PatientEligibilityCriteriaModel>>>(promise);
  }
  //   getLabsForGraph(): Promise<ObjectResponseModel<any>> {
  //     let promise = this.http
  //       .get(ApiUrl.MAIN_URI + 'Lab/getlabgraph')
  //       .toPromise();
  //     return new PromiseHandler<ObjectResponseModel<any>>(promise);
  //   }
  //  getLabsDDO(): Promise<ArrayResponseModel<BaseDataModel<LabModel>>> {
  //     let promise = this.http
  //       .get(ApiUrl.MAIN_URI + 'Lab/DDO')
  //       .toPromise();
  //     return new PromiseHandler<ArrayResponseModel<BaseDataModel<LabModel>>>(promise);
  //   }

  //   getLabsByName(params): Promise<ArrayResponseModel<LabModel>> {
  //     let promise = this.http
  //       .get(ApiUrl.MAIN_URI + 'Lab/searchByCodeOrName?codeOrName=' + params)
  //       .toPromise();
  //     return new PromiseHandler<ArrayResponseModel<LabModel>>(promise);
  //  }

  getPatientEligibilityCriteriaById(PatientEligibilityCriteriaId): Promise<ObjectResponseModel<PatientEligibilityCriteriaModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PatientEligibilityCriteria/' + PatientEligibilityCriteriaId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<PatientEligibilityCriteriaModel>>(promise);
  }
  getPatientConditionDDOs(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PatientCondition/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }
  getRiskGroupDDOs(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'RiskGroup/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }
  getFrequencyTypeDDOs(): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'FrequencyType/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }

  //   getLogo(id): Promise<ObjectResponseModel<LabModel>> {
  //     let promise = this.http
  //       .get(ApiUrl.MAIN_URI + 'Lab/find/' + id)
  //       .toPromise();
  //     return new PromiseHandler<ObjectResponseModel<LabModel>>(promise);
  //   }

  // getInsuranceDDO(): Promise<ObjectResponseModel<any>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'InsuranceCompany/ddo')
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<any>>(promise);
  // }

  // public getLabById(labId): Promise<ObjectResponseModel<LabModel>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'Lab/find/' + labId)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<LabModel>>(promise);
  // }

  savePatientEligibilityCriteria(data): Promise<PostObjectResponseModel<PatientEligibilityCriteriaModel>> {
    let url = ApiUrl.MAIN_URI + 'PatientEligibilityCriteria';
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
    return new PromiseHandler<PostObjectResponseModel<PatientEligibilityCriteriaModel>>(promise);
  }

  public deletePatientEligibilityCriteriaById(PatientEligibilityCriteriaId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'PatientEligibilityCriteria/' + PatientEligibilityCriteriaId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  public getPatientConditionListBasedOnId(ICDCodes): Promise<ObjectResponseModel<any>> {
    let promise
    if (ICDCodes.length === 0) {
      promise = this.http
        .get(ApiUrl.MAIN_URI + 'PatientCondition/ddo')
        .toPromise();
    } else {
      promise = this.http
        .post(ApiUrl.MAIN_URI + 'PatientCondition/ddoByICD', ICDCodes)
        .toPromise();
    }

    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  // public breadcrumbData(id: number): Promise<ObjectResponseModel<any>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'LabInsurance/' + id)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<any>>(promise);
  // }
}
