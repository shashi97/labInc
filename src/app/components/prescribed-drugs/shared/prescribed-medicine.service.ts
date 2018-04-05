import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PrescribedMedicineModel, DrugClass } from './prescribed-medicine.model';
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
export class PrescribedMedicineService {

  constructor(private http: Http) { }

  getPrescribedMedicine(params): Promise<ObjectResponseModel<any>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'PrescribedMedicine/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<any>>(promise);
  }

  savePrescribedMedicine(data): Promise<PostObjectResponseModel<PrescribedMedicineModel>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'PrescribedMedicine', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<PrescribedMedicineModel>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'PrescribedMedicine', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<PrescribedMedicineModel>>(promise);
    }
  }

  public deleteCompoundProfileById(Id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'PrescribedMedicine/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }

  getDrugClass(params): Promise<ObjectResponseModel<BaseDataModel<DrugClass>>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'DrugClass/list', { params: params })
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<BaseDataModel<DrugClass>>>(promise);
  }

  getDrugs(): Promise<ArrayResponseModel<DrugClass>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'DrugClass/ddo')
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<DrugClass>>(promise);
  }


  saveDrugClass(data): Promise<PostObjectResponseModel<DrugClass>> {
    if (data.Id > 0) {
      let promise = this.http
        .put(ApiUrl.MAIN_URI + 'DrugClass', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<DrugClass>>(promise);
    } else {
      let promise = this.http
        .post(ApiUrl.MAIN_URI + 'DrugClass', JSON.stringify(data))
        .toPromise();
      return new PromiseHandler<PostObjectResponseModel<DrugClass>>(promise);
    }
  }

  public deleteDrugById(Id: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'DrugClass/' + Id)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
  

  addDrugClassFromExcel(file): Promise<PostObjectResponseModel<any>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'DrugClass/upload', JSON.stringify(file))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);
  }
}
