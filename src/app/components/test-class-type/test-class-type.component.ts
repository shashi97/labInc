import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from './../../shared';
import { BreadcrumbsService } from './../../core/shared/services';
import { Paginator } from './../../core/paginator/paginator';
import { Message } from 'primeng/primeng';
import { PaginationEnum ,ImportFileEnum} from './../shared/enums';
import { TestClass } from './shared/test-class-type.model';
import { TestClassService } from './shared/test-class-type.service';

@Component({
  selector: 'test-class-type',
  templateUrl: './test-class-type.component.html',
  styleUrls: ['./test-class-type.component.css']
})

export class TestClassTypeComponent implements OnInit {
  public importTitleName: string = 'Test Class Types';
  public importTableHeader = [{ "header": "Test Class Type" }];
  public importTableRow = [{ col1: "A"}];
  public importFileType: number = ImportFileEnum.TestClassType;


  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public errorMsg: Message[] = [];
  private ErrorDiv = '';
  private errormsg = '';
  public testClasses: Array<TestClass> = [];
  public testClass: TestClass = new TestClass();
  public showDialog: boolean = false;
 

  constructor(
    // public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService,
    public TestClassService: TestClassService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'Test Class Type';
    this.getTestClass();
  }


  private deleteTestClass(TestClass) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + TestClass.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.TestClassService.deleteTestingMenuById(TestClass.Id).then(result => {
          this.getTestClass();
          this.errorMsg.push({ severity: 'success', summary: '', detail: 'Record deleted successfully' });
        })
      }
    });
  }

  public getTestClass() {

    this.TestClassService.getTestClass(this.paginationService.getParams()).then(result => {
      this.testClasses = result.data.Data;
      // this.prescribedMedicines =
      // [{ Id: 2, DrugName: "messi", isedit: false },
      // { Id: 3, DrugName: "sam", isedit: false }, { Id: 4, DrugName: "neymar", isedit: false }]
      this.totalRecords = result.data.TotalRecords;
      this.testClasses.forEach(element => {
        element.isedit = false;
        return element;
      });
    })
  }

  importCodes(isShowDialog) {
    this.showDialog = isShowDialog;
    if (!this.showDialog) {
      this.getTestClass();
    }
  }
  public addTestClass() {
    this.ErrorDiv = '';
    this.errormsg = '';
    this.errorMsg = [];
    this.testClasses.forEach(element => {
      if (element.Id === 0) {
        if (element.Name !== '') {
          this.errormsg = 'Save Test Class Type';
          this.errorMsg.push({
            severity: 'error', summary: 'Warn Message',
            detail: 'Sorry you can not add multiple new Test Class Type, Please save first'
          });
          return;
        }
        this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Test Class Type can not be blank' });
        this.errormsg = 'Test Class Type can not blank';
        this.ErrorDiv = 'red';
        return;
      }
    })
    if (this.errormsg !== 'Test Class Type can not blank' && this.errormsg !== 'Save Test Classs') {
      this.testClass = new TestClass();

      this.testClasses = [this.testClass,...this.testClasses];
      // this.prescribedMedicines.splice(0, 0, this.prescribedMedicine);
    }
  }

  public editTestClass(item) {
    let count = 0;
    this.testClasses.forEach(practice => {
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

  public saveTestClass(PracticeItem) {
    if (PracticeItem.Name === '') {
      this.ErrorDiv = 'red';
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Test Class Type  can not be blank' });
      return;
    }
    // this.prescribedMedicines = [...this.prescribedMedicines, PrescribedItem];
    this.TestClassService.saveTestClass(PracticeItem).then(result => {
      this.getTestClass();
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
    this.getTestClass();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getTestClass();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getTestClass();
  }

}
