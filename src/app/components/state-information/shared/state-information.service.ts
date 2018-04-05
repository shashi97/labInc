import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from '../../../components/shared/models/base-data.model';
import { ApiUrl } from '../../../shared/api.service';

@Injectable()
export class StateInformationService {

  constructor(private http: Http) { }

  getPrescribedMedicine(params): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PrescribedMedicine/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  
}
