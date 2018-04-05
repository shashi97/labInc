import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { PatientModel, PatientPermission } from './patient.model';
import { CPTCodesModel, IcdCodeModel, ICD10CodeModel, CPTCodeICDCodeMapping } from '../cptCodes/shared/cptCodes.model'
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
export class CPTCodesService {

  constructor(private http: Http) { }

  getCPTCodes(params, insuranceCompanyId, parent): Promise<ObjectResponseModel<BaseDataModel<CPTCodesModel>>> {
    let url;
    url = 'CPTCode/list';
    if (parent === 'insurance') {
      url = 'CPTCodeICDCodeMapping/list/' + insuranceCompanyId;
    }
    let promise = this.http
      .get(ApiUrl.MAIN_URI + url, { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<CPTCodesModel>>>(promise);
  }

  getCPTCodesForCompound(): Promise<ObjectResponseModel<BaseDataModel<any>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CptCode/list')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<any>>>(promise);
  }

  addCPTCodesFromExcel(file): Promise<PostObjectResponseModel<CPTCodesModel>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'CptCode/upload', JSON.stringify(file))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<CPTCodesModel>>(promise);
  }

  public getCPTCodeById(id: number): Promise<ObjectResponseModel<CPTCodesModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CptCode/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<CPTCodesModel>>(promise);
  }

  public getIcdCodesOncptCodeId(cptCodeId: number): Promise<ArrayResponseModel<IcdCodeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CPTCodeICDCodeMapping/getICD10CodeByMappingCPTCodeId/' + cptCodeId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<IcdCodeModel>>(promise);
  }

  public searchICDCodeMapping(data: string, cptCodeId: number): Promise<ObjectResponseModel<BaseDataModel<ICD10CodeModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CPTCodeICDCodeMapping/findICDCodeByCpt/' + cptCodeId + '?code=' + data)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<ICD10CodeModel>>>(promise);
  }


  public getIcdCodeDetail(cptCodeId: number): Promise<ArrayResponseModel<ICD10CodeModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CPTCodeICDCodeMapping/getICD10CodeByCPTCodeId/' + cptCodeId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<ICD10CodeModel>>(promise);
  }

  saveCptCodes(data): Promise<PostObjectResponseModel<CPTCodesModel>> {
    if (data.id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'CPTCode', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<CPTCodesModel>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'CPTCode', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<CPTCodesModel>>(promise);
    }
  }
  // GET /api/CPTCode/searchByCodeOrName
  public deleteCptCodesById(id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'CPTCode/delete/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  public deleteIcdCodeMappingById(id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'CPTCodeICDCodeMapping/delete/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  public getCPTCodeBySearch(SearchString: string): Promise<ArrayResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'CPTCode/searchByCodeOrName?codeOrName=' + SearchString)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<any>>(promise);
  }


  saveIcdCodeMapping(data): Promise<PostObjectResponseModel<CPTCodeICDCodeMapping>> {
    let url = ApiUrl.MAIN_URI + 'CPTCodeICDCodeMapping';
    let promise = this.http
      .post(url, JSON.stringify(data))
      .toPromise();

    return new PromiseHandler<PostObjectResponseModel<CPTCodeICDCodeMapping>>(promise);
  }

}
