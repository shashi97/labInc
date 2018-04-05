import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'user-left-navbar',
  templateUrl: './user-left-navbar.component.html',
  styleUrls: ['./user-left-navbar.component.css']
})
export class UserLeftNavbarComponent implements OnInit {
  leftMenuItems = [];
  leftMenuItemsEdit = [];
  folderName: string = '';
  id: number = 0;
  labId;
  user: any;
  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.folderName = 'user';
    this.localStorageService.setTopMenu(this.folderName);
    this.id = this.route.snapshot.params['id'] || 0;
    this.user = this.localStorageService.getUserDetail();
    // this.labId = this.route.snapshot.params['labId'] || 0;
  }
  ngOnInit() {

    this.getleftMenu();
    if (this.id > 0) {
      this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItemsEdit, this.route.snapshot.url);
    } else {
      this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
    }
  }
  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
  
  getleftMenu() {
    this.leftMenuItems = [
      { title: 'Users', sref: 'user', icon: 'users.svg', isActive: false },
      { title: 'Add User', sref: 'user/add', icon: 'users.svg', isActive: false }
    ];
    this.leftMenuItemsEdit = [
      // { title: 'User', sref: 'user/' + this.labId, icon: 'users.svg', isActive: false },
      // { title: 'User Info', sref: 'user/' + this.id + '/edit/' + this.user.LabId, icon: 'ic_specimens.svg', isActive: false }
    ];
  }
}
