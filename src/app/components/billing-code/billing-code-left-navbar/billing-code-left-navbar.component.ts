import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'billing-code-left-navbar',
  templateUrl: './billing-code-left-navbar.component.html',
  styleUrls: ['./billing-code-left-navbar.component.css']
})
export class BillingCodeLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  folderName: string = '';
  id: number = 0;
  labGroupId: number = 0;
  leftMenuItemsEdit = [];

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.folderName = 'labtest';
    this.localStorageService.setTopMenu(this.folderName + '/individual');
    this.id = this.route.snapshot.params['id'] || 0;
    this.labGroupId = this.route.snapshot.params['labGroupId'] || 0;
  }

  ngOnInit() {
    this.getleftMenu();
    this.leftMenuItems = this.routeService.activateLeftAllMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  getleftMenu() {
    this.leftMenuItems = [
      { title: 'Individual Tests', sref: 'labtest/individual', icon: 'users.svg', isActive: false },
      { title: 'Test Group Panels', sref: 'labtest/group', icon: 'users.svg', isActive: false },
      { title: 'Complete Testing Menu', sref: 'labtest/testingmenu', icon: 'users.svg', isActive: false }
    ];
  }

  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
