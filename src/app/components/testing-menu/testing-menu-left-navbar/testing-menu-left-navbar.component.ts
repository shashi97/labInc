import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'testing-menu-left-navbar',
  templateUrl: './testing-menu-left-navbar.component.html',
  styleUrls: ['./testing-menu-left-navbar.component.css']
})

export class TestingMenuLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  folderName: string = '';
  id: number = 0;
  leftMenuItemsEdit = [];
  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.id = this.route.snapshot.params['id'];
    this.folderName = 'testingMenu';
    this.localStorageService.setTopMenu(this.folderName + '/testItem');
  }

  ngOnInit() {
    this.getleftMenu();
    this.leftMenuItems = this.routeService.activateLeftAllMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }

  getleftMenu() {
    this.leftMenuItems = [
      { title: 'Analyte/Test Item Library', sref: 'testingMenu/testItem', icon: 'tests.svg', isActive: false },
      { title: 'Test Groups Library', sref: 'testingMenu/groupTest', icon: 'tests.svg', isActive: false },
      { title: 'Test Code Mapping', sref: 'testingMenu/testCodeMapping', icon: 'tests.svg', isActive: false },
      { title: 'Drug/Test Class', sref: 'testingMenu/drugClass', icon: 'tests.svg', isActive: false },
      { title: 'Test Modalities', sref: 'testingMenu/testModality', icon: 'tests.svg', isActive: false },
      { title: 'Test Class Types', sref: 'testingMenu/testClassType', icon: 'tests.svg', isActive: false },
      { title: 'CMS Drug Class', sref: 'testingMenu/drugFamily', icon: 'tests.svg', isActive: false },
      
    ];
  }
}
