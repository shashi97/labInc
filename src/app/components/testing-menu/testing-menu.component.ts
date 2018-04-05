import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from './../../shared';
import { TestingMenuModel, FileUploadModel, TestingMenuService } from './shared/index';
import { Paginator } from '../../core/paginator/paginator';
// import { PatientModel, PatientService, PatientPermission } from '../shared';
import { Message } from 'primeng/primeng';
import { PaginationEnum,ImportFileEnum } from '../shared/enums';

@Component({
  selector: 'testing-menu',
  templateUrl: './testing-menu.component.html',
  styleUrls: ['./testing-menu.component.css']
})

export class TestingMenuComponent implements OnInit {
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  @ViewChild('fileInput') myFileInput: ElementRef;
  public pageSize: number = PaginationEnum.PageSize;
 
  public importTitleName: string = 'Analyte/Test Items';
  public importTableHeader = [{ "header": "Class Type" },{ "header": "Test Name" },{ "header": "Test Class" },
  { "header": "Drug Family" },
  { "header": "Testing Type" },{ "header": "Test Modality" },{ "header": "Test Class Type" }];
  public importTableRow = [{ col1: "A", col2: "B",col3: "C", col4: "D",col5: "E",col6: "F",col7: "G"}];
  public importFileType: number = ImportFileEnum.TestingMenu;

  public totalRecords: number = 0;
  public errorMsg: Message[] = [];
  public errorMessages: Message[] = [];

  public testingMenu: Array<TestingMenuModel> = new Array<TestingMenuModel>();
  public FileUpload: FileUploadModel = new FileUploadModel();
  constructor(
    public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public testingMenuService: TestingMenuService) {
    this.paginationService.setDefaultPage();
  }
  ngOnInit() {
    this.getTestingMenu();
    this.breadcrumbsService.breadcrumbs = 'List of All Testing Menu';
  }
  private getTestingMenu() {
    this.testingMenuService.getTestingMenu(this.paginationService.getParams()).then((result) => {
      this.testingMenu = result.data.Data; // temp data from Molecular API
      this.totalRecords = result.data.TotalRecords;
    });
  }
  deleteTestingMenuById(testingMenu) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + testingMenu.ItemName + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.testingMenuService.deleteTestingMenuById(testingMenu.Id).then(result => {
          this.getTestingMenu();
        })
      },
      reject: () => {
      }
    });

  }



  
  public addTestingMenu(): void {
    this.routeService.openRoute('testingMenu/testItem/add');
  }
  public editTestingMenu(id): void {
    this.routeService.openRoute('testingMenu/testItem/' + id + '/edit');
  }
  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getTestingMenu();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getTestingMenu();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getTestingMenu();
  }

  /* call import excel screen popup */
 
}
