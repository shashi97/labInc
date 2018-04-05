import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel, UserService } from './shared';
import { BreadcrumbsService } from '../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { Paginator } from '../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../shared';
import { PaginationEnum, UserTypeEnum } from '../shared/enums';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../core/shared/services/index';
import { LabService } from './../lab/shared/lab.service';
import { PracticeService } from '../practice/shared/practice.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',

})

export class UserComponent implements OnInit {
  // We are using dataTable for adding grid search and control it 
  // directly using a reference
  @ViewChild(DataTable) dataTableComponent: DataTable;
  // We are using paginator for adding paginator and control it 
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public labId: number; // Variable for containing labId for control from deferent components 
  public users: Array<UserModel> = []; // Variable for containing user list
  public user: UserModel = new UserModel(); // Variable for containing user class model
  public pageSize: number = PaginationEnum.PageSize; // Variable for containing page size from pagination enum
  public totalRecords: number = 0; // Variable for containing total records count
  public userTypeId: number = 0; // Variable for containing user Type Id from user data
  public practiceId: number; // Variable for containing practice Id from user data
  public showSideMenu: boolean = true; // Variable for showing side menu on page
  private validateLoginFrom: boolean = true; // Variable for validate whether it come from practice user page
  public showLeftMenu: boolean = false; // Variable for showing left menu on page
  private defaultLabId: number; // Variable for default lab id
  public leftMenuId = 0; // Variable for left menu id using on grid
  public LinkedTableId: number = 0; // Variable for identify user type 
  public IsActive = true; // Variable for identify user is active or not 
  constructor(
    // We're using the user service to obtain the currently logged in user
    private UserService: UserService,
    // We're using the bread crumbs service to show key detail of the page in bold on top of the page
    public breadcrumbsService: BreadcrumbsService,
    // We're using the route service to route the page
    public routeService: RouteService,
    // We're using the confirmation service to ask user to confirm action
    public confirmationService: ConfirmationService,
    // We're using the activated route service to find active route of the page
    public route: ActivatedRoute,
    // We're using the pagination service to control pagination on grid 
    public paginationService: PaginationService,
    // We're using the local storage service to containing user details and token on browser
    private localStorageService: LocalStorageService,
    // We're using the lab service to obtains lab details for server
    private labService: LabService,
    // We're using the practice service to obtains practice details for server
    private practiceService: PracticeService) {
    // Initializing default page of pagination  service
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    // Setting bread crumbs context menu 
    this.breadcrumbsService.breadcrumbs = 'List of All Users';
    // Getting lab id from page url params
    this.labId = Number(this.route.snapshot.params['labId']) || 0;
    // Setting default lab id from lab id
    this.defaultLabId = this.labId;
    // Getting practice id from page url params
    this.practiceId = Number(this.route.snapshot.params['practiceId']) || 0
    // Checking lab id to set linked table id
    if (this.labId > 0) {
      this.LinkedTableId = this.labId;
    }
    // Checking practice id to set linked table id
    if (this.practiceId > 0) {
      this.LinkedTableId = this.practiceId;
    }
    this.showSideMenu = false;
    this.validateLoginFrom = false;
    // Setting practice type menu comes from practice page 
    if (Number(this.practiceId) !== 0) {
      this.showSideMenu = true;
      this.validateLoginFrom = true;
      this.user.UserTypeId = UserTypeEnum.Practice;
      this.leftMenuId = 3;
    }
    // Setting lab type menu comes from lab page 
    if (Number(this.labId) !== 0 && Number(this.practiceId) === 0) {
      this.user.UserTypeId = UserTypeEnum.Lab;
      this.leftMenuId = 2;
    }
    // Setting user page for network user
    if (Number(this.labId) === 0 && Number(this.practiceId) === 0) {
      this.user.UserTypeId = UserTypeEnum.InNetwork;
      this.leftMenuId = 1;
    }
    // Setting lab management user menu
    if (localStorage.moduleName === 'labManagement') {
      this.showLeftMenu = true;
      this.user.UserTypeId = UserTypeEnum.Lab;
      let user = this.localStorageService.getUserDetail();
      this.LinkedTableId = user.LinkedTableId;
    }
    // Setting practice settings user menu
    if (localStorage.moduleName === 'practiceSettings') {
      this.showLeftMenu = true;
      this.user.UserTypeId = UserTypeEnum.Practice;
      let user = this.localStorageService.getUserDetail();
      this.LinkedTableId = user.LinkedTableId;
    }
    // Settings in network management
    if (localStorage.moduleName === 'settings') {
      let user = this.localStorageService.getUserDetail();
      if (user.UserTypeId == UserTypeEnum.SalesOffice) {
        this.user.UserTypeId = user.userTypeId;
        this.LinkedTableId = user.LinkedTableId;
      }
    }
    // Getting user list
    this.getUsers();
  }

  // Getting user list from server
  getUsers() {
    this.UserService.getUsers(this.paginationService.getParams(), this.user.UserTypeId, this.LinkedTableId).then(result => {
      this.users = result.data.Data;
      // Setting total records value
      this.totalRecords = result.data.TotalRecords;
      if (this.labId > 0 && this.practiceId === 0 && this.defaultLabId === this.labId) {
        // Getting user lab name
        this.getLabName();
      }
      if (this.practiceId > 0) {
        // Getting user practice name
        this.getPracticeName();
      }
      if (this.defaultLabId !== this.labId) {
        // Setting bread crumbs context menu 
        this.breadcrumbsService.breadcrumbs = ' List of All Users';
      }
    })
  }
  // Getting practice name
  getPracticeName() {
    this.practiceService.getPracticeById(this.practiceId).then((practice) => {
      // Setting bread crumbs context menu 
      this.breadcrumbsService.breadcrumbs = practice.data.Name + ' / List of All Users';

    })
  }
  // Getting user lab name
  getLabName() {
    let user = this.localStorageService.getUserDetail();
    // Getting user details from local storage 
    this.labService.getLabNameById(this.labId).then((lab) => {
      if (user.UserTypeId !== 2) {
        // Setting bread crumbs context menu 
        this.breadcrumbsService.breadcrumbs = lab.data.Name + ' / List of All Users';
      } else {
        // Setting bread crumbs context menu 
        this.breadcrumbsService.breadcrumbs = 'List of All Users'
      }
    })
  }
  // Add new user
  addUser() {
    if (this.validateLoginFrom) {
      this.routeService.openRoute('practice/' + this.practiceId + '/user/' + this.labId + '/add');
    } else {
      if (this.labId > 0 && localStorage.moduleName !== "labManagement" && localStorage.moduleName !== "practiceSettings") {
        this.routeService.openRoute('lab/' + this.labId + '/user/add');
      } else {
        this.routeService.openRoute('user/add');
      }
      // this.routeService.openRoute('user/add');
    }
  }

  cancel() {
    // Cancel user 
    this.routeService.openRoute('lab/' + this.labId + '/edit');
  }
  // Edit user by user id 
  editUser(id) {
    if (this.validateLoginFrom) {
      this.routeService.openRoute('practice/' + this.practiceId + '/' + this.labId + '/user/' + id + '/edit');

    } else {
      if (this.labId > 0 && localStorage.moduleName !== "practiceSettings" && localStorage.moduleName !== "labManagement") {
        this.routeService.openRoute('lab/' + this.labId + '/user/' + id + '/edit');
      } else {
        this.routeService.openRoute('user/' + id + '/edit');
      }
    }
  }
  // Delete user by user id 
  deleteUserById(user) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + user.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.UserService.deleteUserById(user.Id).then(result => {
          // Getting user list
          this.getUsers();
        })
      },
      reject: () => {
      }
    });
  }

  /* call to page change of the grid */
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    // Getting user list
    this.getUsers();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    // Getting user list
    this.getUsers();
  }
  onActiveChange(value: any, dt: any, colField: any, colFilterMatchMode: any) {
    dt.filter(value, colField, colFilterMatchMode);

  }
  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    // Getting user list
    this.getUsers();
  }
}
