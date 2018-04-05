import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'lab-left-navbar',
  templateUrl: './lab-left-navbar.component.html',
  styleUrls: ['./lab-left-navbar.component.css']
})
export class LabLeftNavbarComponent implements OnInit {
  leftMenuItems = [];
  leftMenuItemsEdit = [];
  folderName: string = '';
  id: number = 0;
  userId: number = 0;
  @Input() isUserAdd: boolean = false;
  @Input() isdirector: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.folderName = 'lab';
    this.localStorageService.setTopMenu(this.folderName);
    this.id = this.route.snapshot.params['labId'] || 0;
    this.userId = this.route.snapshot.params['id'] || 0;
  }
  ngOnInit() {
    this.getleftMenu();
    if (this.id > 0) {
      if (this.userId > 0) {
        let url = 'lab/' + this.id + '/user';
        this.leftMenuItemsEdit.forEach((val) => {
          if ('/' + val.sref === '/' + url) {
            val.isActive = true;
          } else {
            val.isActive = false;
          }
        });
        this.leftMenuItems = this.leftMenuItemsEdit;
      } else if (this.isdirector) {
        let url = 'lab/' + this.id + '/labdirector';
        this.leftMenuItemsEdit.forEach((val) => {
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
        { title: 'Lab Info', sref: 'lab/' + this.id + '/edit', icon: 'users.svg', isActive: false },
        { title: 'Users', sref: 'lab/' + this.id + '/user', icon: 'users.svg', isActive: false },
        { title: 'Directors', sref: 'lab/' + this.id + '/labdirector', icon: 'users.svg', isActive: false }
      ];
    } else {
      this.leftMenuItemsEdit = [
        { title: 'Lab Info', sref: 'lab/' + this.id + '/edit', icon: 'users.svg', isActive: false },
        { title: 'Users', sref: 'lab/' + this.id + '/user', icon: 'users.svg', isActive: false },
        // { title: 'Add User', sref: 'lab/' + this.id + '/user/add', icon: 'users.svg', isActive: false },
        { title: 'Directors', sref: 'lab/' + this.id + '/labdirector', icon: 'users.svg', isActive: false }
      ];
    }
    if (this.id === 0) {
      let user = this.localStorageService.getUserDetail();
      if (user.UserTypeId == 4 || user.UserTypeId == 5) {
        this.leftMenuItems = [
          { title: 'Laboratories', sref: 'lab', icon: 'users.svg', isActive: false }
        ];
      } else {
        this.leftMenuItems = [
          { title: 'Laboratories', sref: 'lab', icon: 'users.svg', isActive: false },
          { title: 'Add Laboratory', sref: 'lab/add', icon: 'users.svg', isActive: false }
        ];
      }
    }
  }
  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
