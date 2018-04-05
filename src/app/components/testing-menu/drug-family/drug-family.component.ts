import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from '../../../shared';
import { BreadcrumbsService } from '../../../core/shared/services';
import { Paginator } from '../../../core/paginator/paginator';
import { Message } from 'primeng/primeng';
import { PaginationEnum } from '../../shared/enums';
import { DrugFamilyModel } from './shared/drug-family.model';
import { DrugFamilyService } from './shared/drug-family.service';

@Component({
  selector: 'drug-family',
  templateUrl: './drug-family.component.html',
  styleUrls: ['./drug-family.component.css']
})

export class DrugFamilyComponent implements OnInit {
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public errorMsg: Message[] = [];
  private ErrorDiv = '';
  private errormsg = '';
  public drugFamilys: Array<DrugFamilyModel> = [];
  public drugFamily: DrugFamilyModel = new DrugFamilyModel();


  constructor(
    // public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService,
    public drugFamilyService: DrugFamilyService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of all CMS Drug Class';
    this.getDrugFamily();
  }


  private deleteDrugFamily(DrugFamily) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + DrugFamily.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.drugFamilyService.deleteDrugFamilyById(DrugFamily.Id).then(result => {
          this.getDrugFamily();
          this.errorMsg.push({ severity: 'success', summary: '', detail: 'Record deleted successfully' });
        })
      }
    });
  }

  public getDrugFamily() {

    this.drugFamilyService.getDrugFamily(this.paginationService.getParams()).then(result => {
      this.drugFamilys = result.data.Data;
      // this.prescribedMedicines =
      // [{ Id: 2, DrugName: "messi", isedit: false },
      // { Id: 3, DrugName: "sam", isedit: false }, { Id: 4, DrugName: "neymar", isedit: false }]
      this.totalRecords = result.data.TotalRecords;
      this.drugFamilys.forEach(element => {
        element.isedit = false;
        return element;
      });
    })
  }
  public addDrugFamily() {
    this.ErrorDiv = '';
    this.errormsg = '';
    this.errorMsg = [];
    this.drugFamilys.forEach(element => {
      if (element.Id === 0) {
        if (element.Name !== '') {
          this.errormsg = 'Save Drug Family';
          this.errorMsg.push({
            severity: 'error', summary: 'Warn Message',
            detail: 'Sorry you can not add multiple new Drug Family, Please save first'
          });
          return;
        }
        this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Drug Family Name can not be blank' });
        this.errormsg = 'Drug Family can not blank';
        this.ErrorDiv = 'red';
        return;
      }
    })
    if (this.errormsg !== 'Drug Family can not blank' && this.errormsg !== 'Save Drug Family') {
      this.drugFamily = new DrugFamilyModel();

      this.drugFamilys = [this.drugFamily,...this.drugFamilys];
      // this.prescribedMedicines.splice(0, 0, this.prescribedMedicine);
    }
  }

  public editDrugFamily(item) {
    let count = 0;
    this.drugFamilys.forEach(practice => {
      if (practice.isedit) {
        count++;
      }
    })
    if (count === 0) {
      item.isedit = true;
    } else {
      this.errorMsg.push({ severity: 'error', summary: '', detail: 'Please save or cancel the opened Item.' });
    }

  }

  public saveDrugFamily(PracticeItem) {
    if (PracticeItem.Name === '') {
      this.ErrorDiv = 'red';
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Drug Family Name can not be blank' });
      return;
    }
    // this.prescribedMedicines = [...this.prescribedMedicines, PrescribedItem];
    this.drugFamilyService.saveDrugFamily(PracticeItem).then(result => {
      this.getDrugFamily();
    })
  }

  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getDrugFamily();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getDrugFamily();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getDrugFamily();
  }

}
