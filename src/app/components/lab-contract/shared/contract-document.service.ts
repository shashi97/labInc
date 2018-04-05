import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LabContract, LabContractTest } from './lab-contract.model';
import { FileUploadModel } from '../contract-document/shared/contract-document.model';
import {
  BaseDataModel,
  ObjectResponseModel,
  PromiseHandler,
  PostObjectResponseModel,
  ArrayResponseModel,
  DeletePromiseHandler
} from './../../shared/models/base-data.model';

import { ApiUrl } from '../../../shared/api.service';
import {  ResponseContentType } from '@angular/http';
import * as FileSaver from 'file-saver';

@Injectable()
export class ContractDocumnetService {

  constructor(private http: Http) { }

  getDocument(contractLabId): Promise<ArrayResponseModel<FileUploadModel>> {
    let promise = this.http
      .get(ApiUrl.MAIN_URI + 'DocumentStore/contractdocuments/' + contractLabId)
      .toPromise();
    return new PromiseHandler<ArrayResponseModel<FileUploadModel>>(promise);
  }

  saveDocument(data): Promise<PostObjectResponseModel<LabContract>> {
    let url = ApiUrl.MAIN_URI + 'DocumentStore';
    let promise = this.http
      .post(url, JSON.stringify(data));
    return new PromiseHandler<PostObjectResponseModel<LabContract>>(promise.toPromise());
  }

  public deleteFile(fileId: number): Promise<ObjectResponseModel<boolean>> {
    let promise = this.http
      .delete(ApiUrl.MAIN_URI + 'DocumentStore/' + fileId)
      .toPromise();
    return new PromiseHandler<ObjectResponseModel<boolean>>(promise);
  }
   public downloadFile(attachment) {
    this.http.get(ApiUrl.DOCUMENT_STORE_URI + 'Documents/' + attachment.LabId + '/'
      + attachment.FolderName + '/' + attachment.FileName, { responseType: ResponseContentType.Blob })
      .subscribe((response: any) => {
        FileSaver.saveAs(response.blob(), attachment.FileName);
      });
    // window.open(ApiUrl.DOCUMENT_URI + '/Documents/' + attachment.LabId + '/' + attachment.FolderName + '/' + attachment.FileName);
  }

}
