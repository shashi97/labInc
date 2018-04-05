import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';
import { PaginationEnum, UserTypeEnum } from '../../shared/enums';
import { CommonService } from '../../../core/shared/services/common.service';
import { SalesOfficeLab, SalesOfficeModel } from '../shared/sales-office.model';
import { SalesOfficeService } from '../shared/sales-office.service';
@Component({
  selector: 'sales-office-left-navbar',
  templateUrl: './sales-office-left-navbar.component.html',
  styleUrls: ['./sales-office-left-navbar.component.css']
})
export class SalesOfficeLeftNavbarComponent implements OnInit {
  leftMenuItems = [];
  leftMenuItemsEdit = [];
  folderName: string = '';
  id: number = 0;
  userId: number = 0;
  userType: string = '';
  searchText: string = '';
  public saleOffice: Array<SalesOfficeModel> = [];
  public selectedSaleOffice: Array<SalesOfficeLab> = [];
  @Input() isUserAdd: boolean = false;
  @Output() onShowDialogEvent = new EventEmitter();
  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService,
    private commonService: CommonService,
    private salesOfficeService: SalesOfficeService) {
    this.folderName = 'salesOffice';
    this.localStorageService.setTopMenu(this.folderName);
    this.id = this.route.snapshot.params['salesOfficeId'] || 0;
    this.userId = this.route.snapshot.params['id'] || 0;
  }
  ngOnInit() {
    let user = this.localStorageService.getUserDetail();
    if (user.UserTypeId === UserTypeEnum.Lab) {
      this.userType = 'lab';
    }
    if (user.UserTypeId === UserTypeEnum.InNetwork) {
      this.userType = 'inNetwork';
    }
    this.getleftMenu();
    if (this.id > 0) {
      if (this.userId > 0) {
        let url = 'salesOffice/' + this.id + '/user';
        this.leftMenuItemsEdit.forEach(function (val) {
          if ('/' + val.sref === '/' + url) {
            val.isActive = true;
          } else {
            val.isActive = false;
          }
        });
        this.leftMenuItems = this.leftMenuItemsEdit;
      } else {
        this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItemsEdit, this.route.snapshot.url);
      }
    } else {
      this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
    }
  }
  getleftMenu() {
    if (this.userType === 'inNetwork') {
      if (this.userId > 0) {
        this.leftMenuItemsEdit = [
          { title: 'Sales Office Info', sref: 'salesOffice/' + this.id + '/edit', icon: 'users.svg', isActive: false },
          { title: 'Users', sref: 'salesOffice/' + this.id + '/user', icon: 'users.svg', isActive: false }
        ];
      } else {
        this.leftMenuItemsEdit = [
          { title: 'Sales Office Info', sref: 'salesOffice/' + this.id + '/edit', icon: 'users.svg', isActive: false },
          { title: 'Sales Representative', sref: 'salesOffice/' + this.id + '/salesRepresentative', icon: 'users.svg', isActive: false }
        ];
      }
      if (this.id === 0) {
        this.leftMenuItems = [
          { title: 'Sales Offices', sref: 'salesOffice', icon: 'users.svg', isActive: false },
          { title: 'Add Sales Office', sref: 'salesOffice/add', icon: 'users.svg', isActive: false }
        ];
      }
    }
    if (this.userType === 'lab') {
      if (this.id > 0) {
        this.leftMenuItemsEdit = [
          { title: 'Sales Office Info', sref: 'salesOffice/' + this.id + '/edit', icon: 'users.svg', isActive: false },
        ];
      }
      if (this.route.snapshot.url[0] && this.route.snapshot.url[0].path === 'add') {
        this.leftMenuItems = [
          { title: 'Sales Offices', sref: 'salesOffice', icon: 'users.svg', isActive: false },
          { title: 'Add Sales Office', sref: 'salesOffice/add', icon: 'users.svg', isActive: false }
        ];
      } else {
        this.leftMenuItems = [
          { title: 'Sales Offices', sref: 'salesOffice', icon: 'users.svg', isActive: false },
          { title: 'Add Sales Office', sref: 'salesOffice/add', icon: 'users.svg', isActive: false },
          { title: 'Add From Existing', sref: '', icon: 'users.svg', isActive: false }
        ];
      }
    }
  }


  openComponent(item) {
    if (item.title === 'Add From Existing') {
     
     this.onShowDialogEvent.emit(true);
    } else {
      this.routeService.openRoute(item.sref);
    }
  }


}
