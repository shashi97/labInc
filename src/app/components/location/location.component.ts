import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationModel } from './shared/location.model';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../shared';
import { LocationService } from './shared/location.service'
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../core/shared/services/index';
import { PaginationEnum, UserTypeEnum } from '../shared/enums';
import { PracticeService } from '../practice/shared/practice.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',

})

export class LocationComponent implements OnInit {

  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public locations: Array<LocationModel> = [];
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public locationModel: LocationModel = new LocationModel();
  public showShideMenu: boolean = true;
  public linkedTableId: number = 0;
  private validateLoginFrom: boolean = true;

  constructor(
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService, private practiceService: PracticeService) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    let user = this.localStorageService.getUserDetail();
    this.linkedTableId = this.route.snapshot.params['practiceId'] === undefined ? 0 : this.route.snapshot.params['practiceId'];
    if (user.UserTypeId === UserTypeEnum.Practice) {
      this.locationModel.LinkedTableId = user.LinkedTableId;
      this.showShideMenu = false;
      this.validateLoginFrom = false;
    } else {
      this.locationModel.LinkedTableId =
      this.route.snapshot.params['practiceId'] === undefined ? 0 : this.route.snapshot.params['practiceId'];
    }
    this.breadcrumbsService.breadcrumbs = 'List of All Locations';
    this.getLocations();
  }

  getLocations() {
    this.locationService.getLocations(this.paginationService.getParams(), this.locationModel.LinkedTableId).then(result => {
      this.locations = result.data.Data;
      if (this.locationModel.LinkedTableId > 0 && this.validateLoginFrom) {
        this.getPracticeName();
      } else {
        this.breadcrumbsService.breadcrumbs = 'List of All Locations';
      }
      this.totalRecords = result.data.TotalRecords;
    })
  }

  addLocation() {
    if (this.validateLoginFrom) {
      this.routeService.openRoute('practice/' + this.locationModel.LinkedTableId + '/location/add');
    } else {
      this.routeService.openRoute('location/add');
    }
  }

  getPracticeName() {
    this.practiceService.getPracticeById(this.locationModel.LinkedTableId).then((practice) => {
      this.breadcrumbsService.breadcrumbs = practice.data.Name + ' / List of All Locations';
    })
  }

  editLocation(id) {
    if (this.validateLoginFrom) {
      this.routeService.openRoute('practice/' + this.locationModel.LinkedTableId + '/location/' + id + '/edit');
    } else {
      this.routeService.openRoute('location/' + id + '/edit');
    }
  }

  deleteLocationById(location) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + location.LocationName + ' ?',
       icon: 'fa fa-trash',
      accept: () => {
        this.locationService.deleteLocationById(location.Id).then(result => {
          this.getLocations();
        })
      },
    });

  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getLocations();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getLocations();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getLocations();
  }
}
