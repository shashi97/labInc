import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LabModel } from './lab.model';
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
export class LabService {

  constructor(private http: Http) { }

  getLabs(params): Promise<ObjectResponseModel<BaseDataModel<LabModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Lab/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<LabModel>>>(promise);
  }
  getLabsForGraph(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Lab/getlabgraph')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  
  getLabsDDO(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Lab/DDO')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }
  getPracticeDDOByLab(labId: number): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Practice/getByLabId/' + labId )
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }


  getLabsByName(params): Promise<ArrayResponseModel<LabModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Lab/searchByCodeOrName?codeOrName=' + params)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<LabModel>>(promise);
  }

  getLabNameById(labId): Promise<ObjectResponseModel<LabModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Lab/' + labId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<LabModel>>(promise);
  }

  getLogo(id): Promise<ObjectResponseModel<LabModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Lab/find/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<LabModel>>(promise);
  }

  getInsuranceDDO(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceCompany/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  getLabComplexityDDO(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabComplexity/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  public getLabById(labId): Promise<ObjectResponseModel<LabModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Lab/' + labId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<LabModel>>(promise);
  }

  saveLab(data): Promise<PostObjectResponseModel<LabModel>> {
    let url = ApiUrl.MAIN_URI + 'Lab';
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
    return new PromiseHandler<PostObjectResponseModel<LabModel>>(promise);
  }

  public deleteLabById(roleId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'Lab/' + roleId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  public breadcrumbData(id: number): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabInsurance/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

   

}
