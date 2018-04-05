import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'lab-director-left-navbar',
  templateUrl: './lab-director-left-navbar.component.html',
  styleUrls: ['./lab-director-left-navbar.component.css']
})
export class LabDirectorLeftNavbarComponent implements OnInit {
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
    this.folderName = 'labDirector';
    this.localStorageService.setTopMenu(this.folderName);
    this.id = this.route.snapshot.params['labDirectorId'] || 0;
  }
  ngOnInit() {
    this.getleftMenu();
    if (this.id > 0) {
      if (this.userId > 0) {
        let url = 'labDirector/' + this.id + '/user';
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
    if (this.id > 0) {
      this.leftMenuItemsEdit = [
        { title: 'Lab Director Info', sref: 'labDirector/' + this.id + '/edit', icon: 'users.svg', isActive: false },
        // { title: 'Users', sref: 'labDirector/' + this.id + '/user', icon: 'users.svg', isActive: false }
      ];
    }
    if (this.id === 0) {
      this.leftMenuItems = [
        { title: 'Lab Directors', sref: 'labDirector', icon: 'users.svg', isActive: false },
        { title: 'Add Lab Director', sref: 'labDirector/add', icon: 'users.svg', isActive: false }
      ];
    }
  }
  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
