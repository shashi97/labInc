import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LabContract, LabContractTest } from './lab-contract.model';
import { LabModel } from '../../lab';
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
export class LabContractService {

  constructor(private http: Http) { }

  getLabContracts(params): Promise<ArrayResponseModel<LabContract>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabToLabContract/list', { params: params })
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<LabContract>>(promise);
  }

  searchLab(codeOrName: string): Promise<ArrayResponseModel<LabModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabToLabContract/search?codeOrName=' + codeOrName)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<LabModel>>(promise);
  }

  getLabTest(labContractId, contractLabId): Promise<ObjectResponseModel<LabContract>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabToLabContractTest/getcpttest/' + labContractId + '/' + contractLabId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<LabContract>>(promise);
  }

  saveLabContract(data): Promise<PostObjectResponseModel<LabContract>> {
    let url = ApiUrl.MAIN_URI + 'LabToLabContractTest';
    let promise = this.http
      .post(url, JSON.stringify(data));
    if (data.Id > 0) {
      promise = this.http
        .put(url, JSON.stringify(data));
    }
    return new PromiseHandler<PostObjectResponseModel<LabContract>>(promise.toPromise());
  }

  public deleteLabContractById(labContractId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'LabToLabContract/' + labContractId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
}
