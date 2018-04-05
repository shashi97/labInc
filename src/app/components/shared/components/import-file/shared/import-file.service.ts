import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ImportFileModel } from './import-file.model';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from '../../../models/base-data.model';

import { ApiUrl } from '../../../../../shared/api.service';


@Injectable()
export class ImportFileService {

  constructor(private http: Http) { }

  checkExcel(file): Promise<PostObjectResponseModel<any>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'DocumentStore/validateExcelData', JSON.stringify(file))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);
  }
  addAfterCheckExcel(file): Promise<PostObjectResponseModel<any>> {
    let promise = this.http
      .post(ApiUrl.MAIN_URI + 'DocumentStore/upload', JSON.stringify(file))
      .toPromise();
    return new PromiseHandler<PostObjectResponseModel<any>>(promise);
  }

}
