import { Component, OnInit, OnChanges, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { Message } from 'primeng/primeng';
import { CustomDDO } from './../../shared/models/custom-ddo.model';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../../shared';
import { PaginationEnum } from '../../shared/enums';
import { TestProfileModel } from './shared/test-profile.model';
import { TestProfileService } from './shared/test-profile.service';


@Component({
  selector: 'test-profile',
  templateUrl: './test-profile.component.html'
})

export class TestProfileComponent implements OnInit, OnChanges {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public showDialog: boolean = false;
  private showIcdCodeMapping: boolean = false;
  public dialogTitle: string = 'Import CPT Codes';
  public testProfiles: Array<TestProfileModel> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public columnTitle = 'CPT';
  @Input() insuranceCompanyId: number = 0;
  @Input() parent: string = 'cpt';
  public tableHeadingFileFormate: Array<string> = ['CPT Code', 'CPT Description'];
  public tableBodyFileFormate: Array<string> = ['A', 'B'];
  constructor(private testProfileService: TestProfileService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
  }


  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of All Coverage Determination Profiles';
    this.getTestProfileList();
  }
  ngOnChanges() {
    if (this.insuranceCompanyId !== 0) {
      this.getTestProfileList();
    }
  }

  getTestProfileList() {
    this.testProfileService.getTestProfiles(this.paginationService.getParams()).then(result => {
      this.testProfiles = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
    })
  }

  editTestProfile(id) {
    this.routeService.openRoute('codes/coverageDeterminationProfile/' + id + '/edit');
  }

  addTestProfile() {
    this.routeService.openRoute('codes/coverageDeterminationProfile/' + 0 + '/add');
  }

  deleteTestProfile(testProfileId:number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete ',
      icon: 'fa fa-trash',
      accept: () => {
        this.testProfileService.deleteTestProfileById(testProfileId).then(result => {
          this.getTestProfileList();
        })
      },
    });
  }

  importCodes(isShowDialog) {
    this.showDialog = isShowDialog;
    if (!this.showDialog) {
      this.getTestProfileList();
    }
  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getTestProfileList();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getTestProfileList();
  }

  /* call to filter the grid data */
  onFiltering(event, cptCode) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getTestProfileList();
  }
  // icdCodeMapping(cptCode) {
  //   if (this.parent === 'cpt') {
  //     this.routeService.openRoute('codes/icdCodeMapping/' + cptCode.Id);
  //     // this.showIcdCodeMapping = true;
  //   }

  //   if (this.parent === 'insurance') {
  //       this.routeService.openRoute('insurance/icdCodeMapping/' + cptCode.Id + '/' + this.insuranceCompanyId);
  //   }
  // }
  // addCptCode() {
  //   this.routeService.openRoute('insurance/' + this.insuranceCompanyId + '/icdCodeMapping' );
  // }

}
