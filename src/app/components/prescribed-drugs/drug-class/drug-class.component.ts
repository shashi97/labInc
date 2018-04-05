import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { BreadcrumbsService } from './../../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from '../../../shared';
import { DrugClass, PrescribedMedicineService, FileUploadModel } from '../index';
import { BreadcrumbsService } from '../../../core/shared/services';
import { Paginator } from '../../../core/paginator/paginator';
import { Message } from 'primeng/primeng';
import { PaginationEnum ,ImportFileEnum} from '../../shared/enums';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'drug-class',
  templateUrl: './drug-class.component.html',
  styleUrls: ['./drug-class.component.css']
})

export class DrugClassComponent implements OnInit {
  public importTitleName: string = 'Drug/Test Classes';
  public importTableHeader = [{ "header": "Class Name" }, { "header": "Class Type" }];
  public importTableRow = [{ col1: "Name", col2: "Test/Drug"}];
  public importFileType: number = ImportFileEnum.DrugClass;

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  @ViewChild('fileInput') myFileInput: ElementRef;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public errorMsg: Message[] = [];
  public errorMessages: Message[] = [];
  public drugClasses: Array<DrugClass> = new Array<DrugClass>();
  public drugClass: DrugClass = new DrugClass();
  public showTestingLeftMenu: boolean = false;
  public showDialog: boolean = false;
  public dialogTitle: string = '';
  public FileUpload: FileUploadModel = new FileUploadModel();
  constructor(
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService,
    public prescribedMedicineService: PrescribedMedicineService,
    private localStorageService: LocalStorageService) {
    this.paginationService.setDefaultPage();
    let topMenuName = this.localStorageService.getTopMenu();
    if (topMenuName === 'drugs/prescribedDrugs') {
      this.showTestingLeftMenu = false;
    } else {
      this.showTestingLeftMenu = true;
    }
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All Drug Class';
    this.getDrugClass();
  }

  private deleteDrugClass(drugClass) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + drugClass.ClassName + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.prescribedMedicineService.deleteDrugById(drugClass.Id).then(result => {
          this.getDrugClass();
          this.errorMsg.push({ severity: 'success', summary: '', detail: 'Record deleted successfully' });
        })
      }
    });
  }

  public getDrugClass() {
    this.prescribedMedicineService.getDrugClass(this.paginationService.getParams()).then(result => {
      this.drugClasses = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
      this.drugClasses.forEach(element => {
        if (element.IsDrugClass) {
          element.selectedValue = 'Drug';
        } else {
          element.selectedValue = 'Test';
        }

        element.isEdit = false;
        return element;
      });
    })
  }


  public addDrugClass() {
    let errorCount = 0;
    let isEdit = false;
    this.drugClasses.forEach(element => {
      if (element.Id === 0) {
        this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Drug Name can not be blank' });
        errorCount++;
        return;
      }
      if (element.isEdit) {
        isEdit = true;
      }
    });
    if (isEdit) {
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Please first save edit case' });
    }
    if (errorCount === 0 && !isEdit) {
      this.drugClass = new DrugClass();
      this.drugClasses = [ this.drugClass,...this.drugClasses];
    }
  }

  private editDrug(compound): void {
    let count = 0;
    this.drugClasses.forEach(drug => {
      if (drug.isEdit) {
        count++;
      }
    });
    if (count > 0) {
      compound.isEdit = false;
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'First save previous edit' });
    } else {
      compound.isEdit = true;
    }

  }

  importClasses(isShowDialog) {
    this.showDialog = isShowDialog;
    if (!this.showDialog) {
      this.getDrugClass();
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

  uploadFile() {
    if (this.FileUpload.FileData && this.FileUpload.FileName !== '') {
      this.prescribedMedicineService.addDrugClassFromExcel(this.FileUpload).then(res => {
        this.errorShow(res.data);
      });
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
        if (element.ClassType == "drug") {
          value = 'Drug Class = ' + element.ClassName;
        } else {
          value = 'Test Class = ' + element.ClassName;
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
    this.getDrugClass();
    this.myFileInput.nativeElement.value = '';
    this.showDialog = false;
    this.FileUpload = new FileUploadModel();
    this.errorMessages = [];
  }

  onDrugSelected(drug, selectedValue) {
    if (drug.selectedValue === 'Drug') {
      drug.IsDrugClass = true;
    } else {
      drug.IsDrugClass = false;
    }
  }

  public saveDrugClass(PrescribedItem) {
    if (PrescribedItem.ClassName === '') {
      this.errorMsg.push({
        severity: 'error',
        summary: 'Warn Message', detail: 'Class Name can not be blank'
      });
      return;
    }
    this.prescribedMedicineService.saveDrugClass(PrescribedItem).then(result => {
      this.getDrugClass();
    })
  }

  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getDrugClass();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getDrugClass();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getDrugClass();
  }

}
