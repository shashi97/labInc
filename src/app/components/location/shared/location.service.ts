import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { PatientModel, PatientPermission } from './patient.model';
import { LocationModel } from '../shared/location.model';

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
export class LocationService {

  constructor(private http: Http) { }

  getLocations(params , practiceId: number): Promise<ObjectResponseModel<BaseDataModel<LocationModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PracticeLocation/list/' + practiceId , { params: params } )
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<LocationModel>>>(promise);
  }

  getLocationById(id: number): Promise<ObjectResponseModel<LocationModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PracticeLocation/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<LocationModel>>(promise);
  }

  saveLocation(data): Promise<PostObjectResponseModel<LocationModel>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'PracticeLocation', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<LocationModel>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'PracticeLocation', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<LocationModel>>(promise);
    }
  }

  public deleteLocationById(id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'PracticeLocation/' + id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
}
