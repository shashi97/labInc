import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PhysicianModel, PhysicianSpeciality } from './physician.model';
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
export class PhysicianService {

  constructor(private http: Http) { }

  getList(params, practiceId: number): Promise<ObjectResponseModel<BaseDataModel<PhysicianModel>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Physician/list/' + practiceId,
      { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<PhysicianModel>>(promise);
  }

  public getPhysicianById(PhysicianId): Promise<ObjectResponseModel<PhysicianModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'Physician/' + PhysicianId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<PhysicianModel>>(promise);
  }

  public getPhysicianTypes(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PhysicianType/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  savePhysician(data): Promise<PostObjectResponseModel<PhysicianModel>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'Physician', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<PhysicianModel>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'Physician', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<PhysicianModel>>(promise);
    }
  }

  public deletePhysicianById(roleId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'Physician/' + roleId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  public getLocationOnPracticeId(practiceId): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PracticeLocation/ddo/' + practiceId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  getPhysicianSpeciality(params): Promise<ObjectResponseModel<BaseDataModel<PhysicianSpeciality>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PhysicianSpeciality/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<PhysicianSpeciality>>>(promise);
  }

  // public getInsuranceById(patientId): Promise<ObjectResponseModel<PracticeTypeModel>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'PracticeType/' + patientId)
  //     .toPromise();
  //   return new PromiseHandler<ObjectResponseModel<PracticeTypeModel>>(promise);
  // }POST /api/PhysicianSpeciality

  savePhysicianSpeciality(data): Promise<PostObjectResponseModel<PhysicianSpeciality>> {
    let url = ApiUrl.MAIN_URI + 'PhysicianSpeciality';
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
    return new PromiseHandler<PostObjectResponseModel<PhysicianSpeciality>>(promise);
  }
  public deletePhysicianSpecialityById(Id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'PhysicianSpeciality/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
  public getPhysicianSpecialityDDO(): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PhysicianSpeciality/ddo')
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }


}
