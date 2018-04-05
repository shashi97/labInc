import { Component, OnInit, Output, Input, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ImportFileModel, FileUploadModel, ImportFileService } from './shared/index';
import { RouteService, PaginationService } from '../../../../shared';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.scss']
})
export class ImportFileComponent implements OnInit {
  @ViewChild('fileInput') myFileInput: ElementRef;
  @Input() titleName: string = '';
  @Input() importFileType: number = 0;
  @Input() importTableHeader: Array<any> = [];
  @Input() importTableRow: Array<any> = [];

  public FileUpload: FileUploadModel = new FileUploadModel();
  public errorMessages: Message[] = [];
  public importDailogWidth: number = 1000;
  errorMessagesAfter: Message[] = [];
  public showDialog: boolean = false;
  public showUploadButton: boolean = true;
  public showDialogAfterError: boolean = false;
  @Output() getGridData: EventEmitter<any> = new EventEmitter();
  // @Output() onSelectedLab: EventEmitter<any> = new EventEmitter();
  // @Output() onPracticeSelect: EventEmitter<any> = new EventEmitter();
  public uploadingButton: boolean = false;
  public searchLab: string = '';
  private seletedLabName: string = '';
  public importFileModel: Array<ImportFileModel> = [];
  public totalRecords: number = 0;
  constructor(private importFileService: ImportFileService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();

  }

  ngOnInit() {
    this.searchLab = '';
    if (this.importFileType == 10) {
      this.importDailogWidth = 1210;
    }
  }


  ImportFile() {
    this.showDialog = true;
    this.uploadingButton = false;
    this.showUploadButton = true;
  }
  uploadFile() {
    this.FileUpload.UploadType = this.importFileType;
    this.uploadingButton = true;
    if (this.FileUpload.FileData && this.FileUpload.FileName !== '') {
      this.importFileService.checkExcel(this.FileUpload).then(res => {
        this.uploadingButton = false;
        this.errorShow(res.data);
      });
    } else {
      this.uploadingButton = false;
      this.errorMessages = [];
      this.errorMessages.push({ severity: 'error', summary: 'Error Message', detail: 'Please Select File' });
    }
  }

  public fileChangeEvent(fileInput: any) {
    let FR = new FileReader();
    FR.onload = (e) => {
      this.FileUpload.FileName = fileInput.target.files[0].name;
      this.FileUpload.FileData = (e.target as any).result;
    };
    FR.readAsDataURL(fileInput.target.files[0]);
  }
  uploadFileAfterCheck() {
    if (this.FileUpload.FileData && this.FileUpload.FileName !== '') {
      this.importFileService.addAfterCheckExcel(this.FileUpload).then(res => {
        this.uploadingButton = false;
        this.FileUpload = new FileUploadModel();
        if (res.data.length > 0) {
          this.showUploadButton = false;
          this.showDialogAfterError = false;
          res.data.forEach(element => {
            this.errorMessages.push({ severity: 'error', detail: element });
          });
        } else {
          this.showDialogAfterError = false;
          this.closeAfterCheck();
          this.uploadingButton = false;
        }
      });
    } else {
      this.uploadingButton = false;
      this.errorMessages = [];
      this.errorMessages.push({ severity: 'error', summary: 'Error Message', detail: 'Please Select File' });
    }
  }

  errorShow(data: any) {
    if (data.length > 0) {
      data.forEach(element => {
        this.errorMessagesAfter.push({ severity: 'error', detail: element });
      });
      this.showDialogAfterError = true;
    } else {
      this.uploadFileAfterCheck();
    }
  }
  closeAfterCheck() {
    this.getGridData.emit();
    this.errorMessages = [];
    this.errorMessagesAfter = [];
    this.myFileInput.nativeElement.value = '';
    this.FileUpload = new FileUploadModel();
    this.showDialog = false;
    this.showDialogAfterError = false;
  }
  close() {
    this.getGridData.emit();
    this.errorMessages = [];
    this.errorMessagesAfter = [];
    this.myFileInput.nativeElement.value = '';
    this.FileUpload = new FileUploadModel();
  }


}
