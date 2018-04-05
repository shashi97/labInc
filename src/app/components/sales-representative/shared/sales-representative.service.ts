import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SalesRepresentativeModel } from './sales-representative.model';
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
export class SalesRepresentativeService {

  constructor(private http: Http) { }

  getSalesRepresentatives(salesOfficeId,params): Promise<ObjectResponseModel<BaseDataModel<SalesRepresentativeModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SalesRepresentative/list/'+salesOfficeId, { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<SalesRepresentativeModel>>>(promise);
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

  getSalesRepresentativeById(salesRepresentativeId): Promise<ObjectResponseModel<SalesRepresentativeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SalesRepresentative/' + salesRepresentativeId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<SalesRepresentativeModel>>(promise);
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

  saveSalesRepresentative(data): Promise<PostObjectResponseModel<SalesRepresentativeModel>> {
    let url = ApiUrl.MAIN_URI + 'SalesRepresentative';
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
    return new PromiseHandler<PostObjectResponseModel<SalesRepresentativeModel>>(promise);
  }

  public deleteSalesRepresentativeById(salesRepresentativeId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'SalesRepresentative/' + salesRepresentativeId)
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
