import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FileUploadModel } from './shared/contract-document.model';
import { ContractDocumnetService } from '../shared/contract-document.service'
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { BreadcrumbsService } from '../../../core/shared/services';
import { ApiUrl } from '../../../shared/api.service';
import { Http, ResponseContentType } from '@angular/http';
import { LabService, LabModel } from '../../lab';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'contract-document',
  templateUrl: './contract-document.component.html',
  styleUrls: ['./contract-document.component.css']

})

export class ContractDocmentComponent implements OnInit {
  fileUploadModel: FileUploadModel = new FileUploadModel();
  public selectedAttachments: Array<FileUploadModel> = [];
  private contractLabId: number
  private base64Code = '';
  public savedAttachments: Array<FileUploadModel> = [];

  constructor(private contractDocumnetService: ContractDocumnetService,
    public route: ActivatedRoute, private confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService, private labService: LabService) { }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = this.breadcrumbsService.breadcrumbs;
    this.contractLabId = Number(this.route.snapshot.params['contractLabId'])
    this.getDocument();
  }
  getDocument() {
    this.contractDocumnetService.getDocument(this.contractLabId).then((res) => {
      this.savedAttachments = res.data;
      this.getLabDetail();
      this.selectedAttachments = [];
    })
  }
  getLabDetail() {
    this.labService.getLogo(this.contractLabId).then(result => {
      this.breadcrumbsService.breadcrumbs = 'Lab Contract / ' + result.data.Name + ' -' + result.data.City;
    });
  }

  async onUpload(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        let fileToLoad = event.target.files[i];
        await this.generateFileData(fileToLoad);
      };
    };
  }
  async generateFileData(fileToLoad) {
    let fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent: any) => {
      let base64Code = fileLoadedEvent.target.result;
      let fileUploadModel = new FileUploadModel();
      fileUploadModel.FileName = fileToLoad.name;
      fileUploadModel.FileType = fileToLoad.type.split('/')[1];
      fileUploadModel.FileSize = fileToLoad.size;
      fileUploadModel.LabId = this.contractLabId;
      fileUploadModel.FileData = base64Code;
      this.selectedAttachments.push(fileUploadModel)
    };
    fileReader.readAsDataURL(fileToLoad);
  }

  saveFile() {
    this.contractDocumnetService.saveDocument(this.selectedAttachments).then((response) => {
      if (response) {
        this.getDocument()
      }
    })
  }

  onFileDelete(attachment) {
    if (attachment.Id === 0) {
      let index = this.selectedAttachments.indexOf(attachment.Id);
      this.selectedAttachments.splice(index, 1);
      return
    }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + attachment.FileName + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.contractDocumnetService.deleteFile(attachment.Id).then((response) => {
          if (response) {
            this.getDocument();
          }
        })
      },
    });
  }

  downloadFile(attachment) {
    this.contractDocumnetService.downloadFile(attachment)
  }
}
