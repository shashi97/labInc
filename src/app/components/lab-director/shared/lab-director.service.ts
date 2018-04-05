import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LabDirectorModel } from './lab-director.model';
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
export class LabDirectorService {

  constructor(private http: Http) { }

  getLabDirectors(params, labId): Promise<ObjectResponseModel<BaseDataModel<LabDirectorModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabDirector/list/' + labId  , { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<LabDirectorModel>>>(promise);
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

  getLabDirectorById(LabDirectorId): Promise<ObjectResponseModel<LabDirectorModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabDirector/' + LabDirectorId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<LabDirectorModel>>(promise);
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

  saveLabDirector(data): Promise<PostObjectResponseModel<LabDirectorModel>> {
    let url = ApiUrl.MAIN_URI + 'LabDirector';
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
    return new PromiseHandler<PostObjectResponseModel<LabDirectorModel>>(promise);
  }

  public deleteLabDirectorById(LabDirectorId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'LabDirector/' + LabDirectorId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  // public breadcrumbData(id: number): Promise<ObjectResponseModel<any>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'LabInsurance/' + id)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<any>>(promise);
  // }
}
