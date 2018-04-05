import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SalesOfficeModel, SalesOfficeLab } from './sales-office.model';
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
export class SalesOfficeService {

  constructor(private http: Http) { }

  getSalesOffices(params): Promise<ObjectResponseModel<BaseDataModel<SalesOfficeModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SalesOffice/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<SalesOfficeModel>>>(promise);
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

  getSalesOfficeById(salesOfficeId): Promise<ObjectResponseModel<SalesOfficeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SalesOffice/' + salesOfficeId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<SalesOfficeModel>>(promise);
  }

   getSalesOfficeByName(salesOfficeName): Promise<ObjectResponseModel<SalesOfficeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SalesOffice/findByName?name=' + salesOfficeName)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<SalesOfficeModel>>(promise);
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

  saveSalesOffice(data): Promise<PostObjectResponseModel<SalesOfficeModel>> {
    let url = ApiUrl.MAIN_URI + 'SalesOffice';
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
    return new PromiseHandler<PostObjectResponseModel<SalesOfficeModel>>(promise);
  }

  public deleteSalesOfficeById(salesOfficeId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'SalesOffice/' + salesOfficeId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

    public deleteLinkingSalesOfficeById(salesOfficeId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'SalesOfficeLab/' + salesOfficeId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

   public getSalesOfficeDDO(): Promise<ObjectResponseModel<BaseDataModel<SalesOfficeModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SalesOffice/list')
      .toPromise();
    return new PromiseHandler<BaseDataModel<SalesOfficeModel>>(promise);
  }

   public searchSaleOffice(data):  Promise<ArrayResponseModel<SalesOfficeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'SalesOffice/searchSalesOffice?codeOrName=' + data)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<SalesOfficeModel>>(promise);
  }

   linkSaleOffice(data): Promise<PostObjectResponseModel<SalesOfficeLab>> {
    let url = ApiUrl.MAIN_URI + 'SalesOfficeLab';
    let promise = this.http
      .post(url, JSON.stringify(data))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<SalesOfficeLab>>(promise);
  }

  // public breadcrumbData(id: number): Promise<ObjectResponseModel<any>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'LabInsurance/' + id)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<any>>(promise);
  // }
}
