
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PhysicianService } from './shared';
import { BreadcrumbsService } from './../../core/shared/services';
import { Paginator } from './../../core/paginator/paginator';
import { RouteService, PaginationService } from './../../shared';
import { ConfirmationService, DataTable, Message } from 'primeng/primeng';
import { PhysicianModel } from '../Physician/shared/physician.model';
import { LocalStorageService } from '../../core/shared/services/index';
import { PaginationEnum } from '../shared/enums';
import { PracticeService } from '../practice/shared/practice.service';

@Component({
  selector: 'app-physician',
  templateUrl: './Physician.component.html',

})

export class PhysicianComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;

  public practiceId: number;
  public physicians: Array<PhysicianModel> = [];
  public totalRecords: number = 0;
  public Message: Array<any> = [];
  constructor(
    public breadcrumbsService: BreadcrumbsService,
    private confirmationService: ConfirmationService,
    public routeService: RouteService,
    public route: ActivatedRoute,
    public physicianService: PhysicianService,
    private localStorageService: LocalStorageService,
    public paginationService: PaginationService, private practiceService: PracticeService) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.practiceId = this.route.snapshot.params['practiceId'] === undefined ? 0 : Number(this.route.snapshot.params['practiceId']);
    this.getPhysicians();

    //  this.moduleAccess = this.localStorageService.getModuleAccessibilty('Role');
  }

  /*call to get List of all Physician array*/
  public getPhysicians(): void {
    this.physicianService.getList(this.paginationService.getParams(), this.practiceId).then(res => {
      this.physicians = res.data.Data;
      this.totalRecords = res.data.TotalRecords;
      if (this.practiceId > 0) {
        this.getPracticeName()
      } else {
        this.breadcrumbsService.breadcrumbs = 'List of All Physicians';
      }
    });
  }


  addPhysician() {
    if (this.practiceId > 0) {
      this.routeService.openRoute('practice/' + this.practiceId + '/physician/add');
    } else {
      this.routeService.openRoute('physician/add');
    }
  }

  getPracticeName() {
    this.practiceService.getPracticeById(this.practiceId).then((practice) => {
      this.breadcrumbsService.breadcrumbs = practice.data.Name + ' / List of All Physicians';
    })
  }

  /* edit the row of single row */
  private editPhysician(id: number) {
    if (this.practiceId > 0) {
      this.routeService.openRoute('practice/' + this.practiceId + '/physician/' + id + '/edit');
    } else {
      this.routeService.openRoute('physician/' + id + '/edit');
    }
  }

  /* delete the row of single row */
  private deletePhysicianById(physician) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + physician.Name + ' ?',
       icon: 'fa fa-trash',
      accept: () => {
        this.physicianService.deletePhysicianById(physician.Id).then(res => {
          this.getPhysicians();
          this.Message.push({
            severity: 'success',
            summary: 'Success Message', detail: 'Delete Successfully'
          });
        });
      },
      reject: () => {

      }
    });
  }


  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getPhysicians();
  }
  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getPhysicians();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getPhysicians();
  }

}



