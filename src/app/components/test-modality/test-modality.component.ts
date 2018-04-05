import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from './../../shared';
import { BreadcrumbsService } from './../../core/shared/services';
import { Paginator } from './../../core/paginator/paginator';
import { Message } from 'primeng/primeng';
import { PaginationEnum,ImportFileEnum } from './../shared/enums';
import { TestModality } from './shared/test-modality.model';
import { TestModalityService } from './shared/test-modality.service';

@Component({
  selector: 'test-modality',
  templateUrl: './test-modality.component.html',
  styleUrls: ['./test-modality.component.css']
})

export class TestModalityComponent implements OnInit {
  public importTitleName: string = 'Test Modalities';
  public importTableHeader = [{ "header": "Test Modality" }];
  public importTableRow = [{ col1: "A"}];
  public importFileType: number = ImportFileEnum.TestModality;

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;

  public errorMsg: Message[] = [];
  private ErrorDiv = '';
  private errormsg = '';
  public testModalities: Array<TestModality> = [];
  public testModality: TestModality = new TestModality();


  constructor(
    // public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService,
    public TestModalityService: TestModalityService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'Test Modality';
    this.getTestModality();
  }


  private deleteTestModality(TestModality) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + TestModality.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.TestModalityService.deleteTestingMenuById(TestModality.Id).then(result => {
          this.getTestModality();
          this.errorMsg.push({ severity: 'success', summary: '', detail: 'Record deleted successfully' });
        })
      }
    });
  }

 
  public getTestModality() {

    this.TestModalityService.getTestModulity(this.paginationService.getParams()).then(result => {
      this.testModalities = result.data.Data;
      // this.prescribedMedicines =
      // [{ Id: 2, DrugName: "messi", isedit: false },
      // { Id: 3, DrugName: "sam", isedit: false }, { Id: 4, DrugName: "neymar", isedit: false }]
      this.totalRecords = result.data.TotalRecords;
      this.testModalities.forEach(element => {
        element.isedit = false;
        return element;
      });
    })
  }
  public addTestModality() {
    this.ErrorDiv = '';
    this.errormsg = '';
    this.errorMsg = [];
    this.testModalities.forEach(element => {
      if (element.Id === 0) {
        if (element.Name !== '') {
          this.errormsg = 'Save Test Modality';
          this.errorMsg.push({
            severity: 'error', summary: 'Warn Message',
            detail: 'Sorry you can not add multiple new Test Modality, Please save first'
          });
          return;
        }
        this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Test Modality Name can not be blank' });
        this.errormsg = 'Test Modality can not blank';
        this.ErrorDiv = 'red';
        return;
      }
    })
    if (this.errormsg !== 'Test Modality can not blank' && this.errormsg !== 'Save Test Modalitys') {
      this.testModality = new TestModality();

      this.testModalities = [ this.testModality,...this.testModalities];
      // this.prescribedMedicines.splice(0, 0, this.prescribedMedicine);
    }
  }

  public editTestModality(item) {
    let count = 0;
    this.testModalities.forEach(practice => {
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

  public saveTestModality(PracticeItem) {
    if (PracticeItem.Name === '') {
      this.ErrorDiv = 'red';
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Test Modality Name can not be blank' });
      return;
    }
    // this.prescribedMedicines = [...this.prescribedMedicines, PrescribedItem];
    this.TestModalityService.saveTestModulity(PracticeItem).then(result => {
      this.getTestModality();
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
    this.getTestModality();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getTestModality();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getTestModality();
  }

}
