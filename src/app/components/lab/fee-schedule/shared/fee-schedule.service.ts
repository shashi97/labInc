import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FeeSchedule, LabInsuranceStateModel, StateModel } from './';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from '../../../shared/models/base-data.model';

import { ApiUrl } from '../../../../shared/api.service';

@Injectable()
export class FeeScheduleService {

  constructor(private http: Http) { }

  public getFeeScheduleById(id: number): Promise<ArrayResponseModel<FeeSchedule>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'InsuranceFeeSchedule/findByLabInsuranceStateId/' + id)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<FeeSchedule>>(promise);
  }

  saveFeeSchedule(data): Promise<PostObjectResponseModel<FeeSchedule>> {
    let url = ApiUrl.MAIN_URI + 'InsuranceFeeSchedule';
    let promise = this.http
      .put(url, JSON.stringify(data))
      .toPromise();

    return new PromiseHandler<ArrayResponseModel<StateModel>>(promise);
  }

  saveSelectedState(data): Promise<ArrayResponseModel<StateModel>> {
    let url = ApiUrl.MAIN_URI + 'LabInsuranceState';
    let promise = this.http
      .post(url, JSON.stringify(data))
      .toPromise();

    return new PromiseHandler<ArrayResponseModel<StateModel>>(promise);
  }


  public getStates(labInsuranceId: number): Promise<ArrayResponseModel<StateModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabInsuranceState/labInsuranceCompanyStates/' + labInsuranceId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<StateModel>>(promise);
  }
   public getStatesBasedOnInsurnace(labInsuranceId: number): Promise<ArrayResponseModel<StateModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'LabInsuranceState/labInsuranceStateById/' + labInsuranceId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<StateModel>>(promise);
  }

   public deleteStatesById(stateId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'LabInsuranceState/delete/' + stateId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  //  public getStateList(): Promise<ArrayResponseModel<StateModel>> {
  //   let promise = this.http
  //     .get(ApiUrl.MAIN_URI + 'InsuranceCompany/insuranceCompanyStates/' )
  //     .toPromise();
  //   return new PromiseHandler<ArrayResponseModel<StateModel>>(promise);
  // }
}
