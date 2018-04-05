import { Component, OnInit, ViewChild } from '@angular/core';
import { LabDirectorModel, LabDirectorService } from './shared';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../shared';
import { PaginationEnum } from '../shared/enums';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../core/shared/services/index';
import { LabService } from './../lab/shared/lab.service';


@Component({
  selector: 'app-lab-director',
  templateUrl: './lab-director.component.html',
})

export class LabDirectorComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public labDirectors: Array<LabDirectorModel> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  private labId: number = 0;
  constructor(private labDirectorService: LabDirectorService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService,
    public route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private labService: LabService) {
    this.paginationService.setDefaultPage();

  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'List of Laboratory Directors';
    this.labId = Number(this.route.snapshot.params['labId']) || 0;
    if (this.labId > 0) {
      this.getLabName()
    } else {
      this.breadcrumbsService.breadcrumbs = 'List of Laboratory Directors';
        this.getLabDirectors();
    }

  }

  getLabName() {
    let user = this.localStorageService.getUserDetail();
    this.labService.getLabNameById(this.labId).then((lab) => {
      if (this.labId !== 0) {
        this.breadcrumbsService.breadcrumbs = lab.data.Name + ' / List of Laboratory Directors';
      } else {
        this.breadcrumbsService.breadcrumbs = 'List of Laboratory Directors'
      }
      this.getLabDirectors();
    })
  }

  getLabDirectors() {
    this.labDirectorService.getLabDirectors(this.paginationService.getParams(), this.labId).then(result => {
      this.labDirectors = result.data.Data;
      this.totalRecords = result.data.TotalRecords;
    })
  }

  addLabDirector() {
    if (this.labId > 0) {
      this.routeService.openRoute('labDirector/' + 0 + '/lab/' + this.labId + '/add');
    } else {
      this.routeService.openRoute('labDirector/add');
    }
  }

  editLabDirector(labDirectorId) {
    if (this.labId > 0) {
      this.routeService.openRoute('labDirector/' + labDirectorId + '/lab/' + this.labId + '/edit');
    } else {
      this.routeService.openRoute('labDirector/' + labDirectorId + '/edit');
    }
  }

  deleteLabDirectorById(labDirector) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + labDirector.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.labDirectorService.deleteLabDirectorById(labDirector.Id).then(result => {
          this.getLabDirectors();
        })
      },
      reject: () => {
      }
    });

  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getLabDirectors();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getLabDirectors();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    // this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getLabDirectors();
  }
}
