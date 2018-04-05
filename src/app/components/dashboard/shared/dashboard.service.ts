import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DashboardModel} from './dashboard.model';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from './../../shared/models/base-data.model';

import { ICDCodesModel } from '../../codes/icdCodes/shared/icdCodes.model';
import { ApiUrl } from '../../../shared/api.service';


@Injectable()
export class OrderService {

  constructor(private http: Http) { }

  getDashboard(params): Promise<ObjectResponseModel<BaseDataModel<DashboardModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'labdashboard')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<DashboardModel>>>(promise);
  }

}