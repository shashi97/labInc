import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/primeng';
import { CustomDDO } from '../../shared/models/custom-ddo.model';
import { ICDCodesService } from '../shared/icdCodes.service';
import { CPTCodesService } from '../shared/cptCodes.service';
import { FileUploadModel } from '../../lab-contract/contract-document/shared/contract-document.model';
import { TestClassService } from '../../test-class-type/shared/test-class-type.service';
import { TestModalityService } from '../../test-modality/shared/test-modality.service';
@Component({
  selector: 'app-import-code',
  templateUrl: './import-code.component.html'
})

export class ImportCodeComponent implements OnInit {

  @Input() showDialog: boolean = false;
  @Input() dialogTitle: string = '';
  @Input() tableHeadingFileFormate: Array<any>;
  @Input() tableBodyFileFormate: Array<any>;
  @Output() closeDialog = new EventEmitter();
  public errorMessages: Message[] = [];
  @ViewChild('fileInput') myFileInput: ElementRef;
  @Input() codeName: string = '';

  public FileUpload: FileUploadModel = new FileUploadModel();

  constructor(private icdCodesService: ICDCodesService,
    private cptCodesService: CPTCodesService,
    private route: ActivatedRoute,
    private testClassService: TestClassService,
    private testModalityService: TestModalityService) {
  }

  ngOnInit() { }

  public fileChangeEvent(fileInput: any) {
    let FR = new FileReader();
    FR.onload = (e) => {
      this.FileUpload.FileName = fileInput.target.files[0].name;
      this.FileUpload.FileData = (e.target as any).result;
    };
    FR.readAsDataURL(fileInput.target.files[0]);
  }

  uploadFile() {
    if (this.FileUpload.FileData && this.FileUpload.FileName !== '') {
      if (this.dialogTitle === 'Import CPT Codes') {
        this.cptCodesService.addCPTCodesFromExcel(this.FileUpload).then(res => {
          this.errorShow(res.data);
        });
      }
      if (this.dialogTitle === 'Import ICD Codes') {
        this.icdCodesService.addICD10CodesFromExcel(this.FileUpload).then(res => {
          this.errorShow(res.data);
        })
      }

      if (this.dialogTitle === 'Import Test Modalities') {
        this.testModalityService.addTestModulityFromExcel(this.FileUpload).then(res => {
          this.errorShow(res.data);
        })
      }
      if (this.dialogTitle === 'Import Test Class Types') {
        this.testClassService.addTestClassTypeFromExcel(this.FileUpload).then(res => {
          this.errorShow(res.data);
        })
      }
    } else {
      this.errorMessages = [];
      this.errorMessages.push({ severity: 'error', summary: 'Error Message', detail: 'Please Select File' });
    }
  }

  errorShow(data: any) {
    if (data.length > 0) {
      this.errorMessages = [];
      let errorList = ['Duplicate Entry!!'];
      data.forEach(element => {
        let value;
        if (this.dialogTitle === 'Import Test Modalities' || this.dialogTitle === 'Import Test Class Types') {
          value = 'Code = ' + element.Name;
        }
        if (this.dialogTitle === 'Import CPT Code' || this.dialogTitle ===  'Import ICD Codes') {
          value = 'Code = ' + element.code;
        }
        errorList.splice(errorList.length, 0, value);
      });
      errorList.forEach(error => {
        this.errorMessages.push({ severity: 'error', summary: '', detail: error });
      })

    } else {
      this.close();
    }
  }

  close() {
    this.errorMessages = [];
    this.myFileInput.nativeElement.value = '';
    this.FileUpload = new FileUploadModel();
    this.showDialog = false;
    this.closeDialog.emit(false);
  }

}
