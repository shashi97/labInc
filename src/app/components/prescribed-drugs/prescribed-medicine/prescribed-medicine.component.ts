import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { BreadcrumbsService } from './../../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from '../../../shared';
import { PrescribedMedicineModel, PrescribedMedicineService } from '../index';
import { BreadcrumbsService } from '../../../core/shared/services';
import { Paginator } from '../../../core/paginator/paginator';
import { Message } from 'primeng/primeng';
import { PaginationEnum, ImportFileEnum } from '../../shared/enums';
import { CustomDDO } from './../../shared/models/custom-ddo.model';

@Component({
  selector: 'prescribed-medicine',
  templateUrl: './prescribed-medicine.component.html',
  styleUrls: ['./prescribed-medicine.component.css']
})

export class PrescribedMedicineComponent implements OnInit {
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;

  public importTitleName: string = 'Prescribed Drugs';
  public importTableHeader = [{ "header": "Drug Name" }, { "header": "Drug Class" }];
  // public importTableRow = [{"Row":"A"},{"Row":"B"}];
  public importTableRow = [{ col1: "A", col2: "B" }];
  public importFileType: number = ImportFileEnum.PrescribedDrugs;

  public errorMsg: Message[] = [];
  private ErrorDiv = '';
  private errormsg = '';
  public prescribedMedicines: Array<PrescribedMedicineModel> = new Array<PrescribedMedicineModel>();
  public prescribedMedicine: PrescribedMedicineModel = new PrescribedMedicineModel();
  public drugs: Array<CustomDDO> = [];

  constructor(
    // public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService,
    public prescribedMedicineService: PrescribedMedicineService) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All Prescribed Drugs';
    this.getDrugs();
    this.getPrescribedMedicine();
  }

  getDrugs() {
    this.prescribedMedicineService.getDrugs().then(result => {
      let drugList = result.data;
      drugList.forEach(drug => {
        let obj: CustomDDO = { label: drug.ClassName, value: drug.Id };
        this.drugs.splice(this.drugs.length, 0, obj);
      })
    })
  }


  private deletePrescribedMedicine(prescribedMedicine) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + prescribedMedicine.DrugName + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.prescribedMedicineService.deleteCompoundProfileById(prescribedMedicine.Id).then(result => {
          this.getPrescribedMedicine();
          this.errorMsg.push({ severity: 'success', summary: '', detail: 'Record deleted successfully' });
        })
      }
    });
  }

  public getPrescribedMedicine() {

    this.prescribedMedicineService.getPrescribedMedicine(this.paginationService.getParams()).then(result => {
      this.prescribedMedicines = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
      this.prescribedMedicines.forEach(element => {
        element.isedit = false;
        return element;
      });
    })
  }

  public addPrescribedMedicine() {
    this.ErrorDiv = '';
    this.errormsg = '';
    this.errorMsg = [];
    this.prescribedMedicines.forEach(element => {
      if (element.Id === 0) {
        if (element.DrugName !== '') {
          this.errormsg = 'Save Prescribed Medicine type';
          this.errorMsg.push({
            severity: 'error', summary: 'Warn Message',
            detail: 'Sorry you can not add multiple new Prescribed Medicine, Please save first'
          });
          return;
        }
        this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Prescribed Medicine Drug Name can not be blank' });
        this.errormsg = 'Drug Name can not blank';
        this.ErrorDiv = 'red';
        return;
      }
    })
    if (this.errormsg !== 'Drug Name can not blank' && this.errormsg !== 'Save Prescribed Medicine type') {
      this.prescribedMedicine = new PrescribedMedicineModel();
      this.prescribedMedicines = [this.prescribedMedicine,...this.prescribedMedicines];
      // this.prescribedMedicines.splice(0, 0, this.prescribedMedicine);
    }
  }

  public editPrescribed(compound) {
    let count = 0;
    this.prescribedMedicines.forEach(medicine => {
      if (medicine.isedit) {
        count++;
      }
    })

    if (count === 0) {
      compound.isedit = true;
    } else {
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Please save or cancel the opened Item.' });
    }

  }

  public savePrescribedMedicine(PrescribedItem) {
    if (PrescribedItem.DrugName === '') {
      this.ErrorDiv = 'red';
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Prescribed Medicine Drug Name can not be blank' });
      return;
    }
    if (PrescribedItem.DrugClassId === null || PrescribedItem.DrugClassId === 0) {
      this.ErrorDiv = 'red';
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Prescribed Medicine Drug Class can not be blank' });
      return;
    }

    this.prescribedMedicineService.savePrescribedMedicine(PrescribedItem).then(result => {
      this.getPrescribedMedicine();
    })
  }

  public editCompoundProfile(id): void {
    this.routeService.openRoute('compoundProfile/' + id + '/edit');
  }

  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getPrescribedMedicine();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getPrescribedMedicine();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getPrescribedMedicine();
  }

}
