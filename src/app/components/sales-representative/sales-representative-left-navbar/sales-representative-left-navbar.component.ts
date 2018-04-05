import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'sales-representative-left-navbar',
  templateUrl: './sales-representative-left-navbar.component.html',
  styleUrls: ['./sales-representative-left-navbar.component.css']
})
export class SalesRepresentativeLeftNavbarComponent implements OnInit {
  leftMenuItems = [];
  leftMenuItemsEdit = [];
  folderName: string = '';
  id: number = 0;
  userId: number = 0;
  @Input() isUserAdd: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.folderName = 'salesRepresentative';
    this.localStorageService.setTopMenu(this.folderName);
    this.id = this.route.snapshot.params['salesRepresentativeId'] || 0;
    this.userId = this.route.snapshot.params['id'] || 0;
  }
  ngOnInit() {
    this.getleftMenu();
    if (this.id > 0) {
      if (this.userId > 0) {
        let url = 'salesRepresentative/' + this.id + '/user';
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
    if (this.userId > 0) {
      this.leftMenuItemsEdit = [
        { title: 'Sales Representative Info', sref: 'salesRepresentative/' + this.id + '/edit', icon: 'users.svg', isActive: false },
        // { title: 'Users', sref: 'salesRepresentative/' + this.id + '/user', icon: 'users.svg', isActive: false }
      ];
    } else {
      this.leftMenuItemsEdit = [
        // { title: 'Sales Representative Info', sref: 'salesRepresentative/' + this.id + '/edit', icon: 'users.svg', isActive: false },
        // { title: 'Users', sref: 'salesRepresentative/' + this.id + '/user', icon: 'users.svg', isActive: false },
        // { title: 'Add User', sref: 'salesRepresentative/' + this.id + '/user/add', icon: 'users.svg', isActive: false }
      ];
    }
    if (this.id === 0) {
      this.leftMenuItems = [
        { title: 'Sales Representatives', sref: 'salesRepresentative', icon: 'users.svg', isActive: false },
        { title: 'Add Sales Representative', sref: 'salesRepresentative/add', icon: 'users.svg', isActive: false }
      ];
    }
  }
  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
