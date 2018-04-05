import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from './../../../shared';
import { BreadcrumbsService } from './../../../core/shared/services';
import { Paginator } from './../../../core/paginator/paginator';
import { Message } from 'primeng/primeng';
import { PaginationEnum } from './../../shared/enums';
import { PracticeTypeModel } from '../shared/practice.model';
import { PracticeService } from '../shared/practice.service';

@Component({
  selector: 'practice-type',
  templateUrl: './practice-type.component.html',
  styleUrls: ['./practice-type.component.css']
})

export class PracticeTypeComponent implements OnInit {
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public errorMsg: Message[] = [];
  private ErrorDiv = '';
  private errormsg = '';
  public practiceTypes: Array<PracticeTypeModel> = [];
  public practiceType: PracticeTypeModel = new PracticeTypeModel();


  constructor(
    // public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService,
    public practiceTypeService: PracticeService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'Practice Type';
    this.getPracticeType();
  }


  private deletePracticeType(PracticeType) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + PracticeType.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.practiceTypeService.deletePracticeTypeById(PracticeType.Id).then(result => {
          this.getPracticeType();
          this.errorMsg.push({ severity: 'success', summary: '', detail: 'Record deleted successfully' });
        })
      }
    });
  }

  public getPracticeType() {

    this.practiceTypeService.getPracticeType(this.paginationService.getParams()).then(result => {
      this.practiceTypes = result.data.Data;
      // this.prescribedMedicines =
      // [{ Id: 2, DrugName: "messi", isedit: false },
      // { Id: 3, DrugName: "sam", isedit: false }, { Id: 4, DrugName: "neymar", isedit: false }]
      this.totalRecords = result.data.TotalRecords;
      this.practiceTypes.forEach(element => {
        element.isedit = false;
        return element;
      });
    })
  }
  public addPracticeType() {
    this.ErrorDiv = '';
    this.errormsg = '';
    this.errorMsg = [];
    this.practiceTypes.forEach(element => {
      if (element.Id === 0) {
        if (element.Name !== '') {
          this.errormsg = 'Save Practice Type';
          this.errorMsg.push({
            severity: 'error', summary: 'Warn Message',
            detail: 'Sorry you can not add multiple new Practice Type, Please save first'
          });
          return;
        }
        this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Practice Type Name can not be blank' });
        this.errormsg = 'Practice Type can not blank';
        this.ErrorDiv = 'red';
        return;
      }
    })
    if (this.errormsg !== 'Practice Type can not blank' && this.errormsg !== 'Save Practice Types') {
      this.practiceType = new PracticeTypeModel();

      this.practiceTypes = [ this.practiceType,...this.practiceTypes];
      // this.prescribedMedicines.splice(0, 0, this.prescribedMedicine);
    }
  }

  public editPractice(item) {
    let count = 0;
    this.practiceTypes.forEach(practice => {
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

  public savePracticeType(PracticeItem) {
    if (PracticeItem.Name === '') {
      this.ErrorDiv = 'red';
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Practice Type Name can not be blank' });
      return;
    }
    // this.prescribedMedicines = [...this.prescribedMedicines, PrescribedItem];
    this.practiceTypeService.savePracticeType(PracticeItem).then(result => {
      this.getPracticeType();
    })
  }

  // public addCompoundProfile(): void {
  //   this.routeService.openRoute('compoundProfile/add');
  // }
  // public editCompoundProfile(id): void {
  //   this.routeService.openRoute('compoundProfile/' + id + '/edit');
  // }
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getPracticeType();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getPracticeType();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getPracticeType();
  }

}
