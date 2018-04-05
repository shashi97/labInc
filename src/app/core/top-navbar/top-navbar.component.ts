import { Component, OnInit, DoCheck, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../shared/services/index';
import { RouteService } from '../../shared/route.service';
import { CommonService } from '../shared/services/common.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'top-navbar',
  templateUrl: 'top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})

export class TopNavbarComponent implements OnInit, DoCheck, OnDestroy {

  selectedItem: string = 'Dashboard';
  searchStr = '';
  dropdownMenuItems = [];
  topMenus = [];
  selectedTopMenu: string = '';
  private subscription: Subscription;

  constructor(public router: Router,
    public route: ActivatedRoute,
    public routeService: RouteService,
    private commonService: CommonService,
    private localStorageService: LocalStorageService) {
    this.dropdownMenuItems = this.routeService.topModuleMenus();
  }

  ngOnInit() {
    let moduleName = 'dashboard';
    if (this.localStorageService.getModuleName()) {
      moduleName = this.localStorageService.getModuleName();
    }

    // let user = this.localStorageService.getLoggedUser();

    // if (user && user.User.UserTypeId === 1) {
    //   // this.addDropdownMenu(false);
    // }

    let selectedModule = this.dropdownMenuItems.filter(val => val.sref === moduleName)[0];
    if (selectedModule) {
      this.selectItem(selectedModule, true);
    } else {
      this.localStorageService.removeLogin();
      this.router.navigate(['/login']);
    }

    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'onSelected') {
        if (res.value === 'Lab Login') {
          this.addDropdownMenu(false);
        };
        if (res.value === 'Admin Login') {
          this.addDropdownMenu(true);
        }
      }
    });

    this.initMenu();
  }

  ngDoCheck() {
    // this.initMenu();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  changeTopMenu(item) {
    this.selectedTopMenu = item.sref;
    this.localStorageService.setTopMenu(this.selectedTopMenu);
    this.topMenus.forEach(topMenu => {
      if (topMenu.sref === this.selectedTopMenu) {
        topMenu.isActive = true;
      } else {
        topMenu.isActive = false;
      }
    })
    this.router.navigate(['/' + this.localStorageService.getModuleName() + '/' + this.selectedTopMenu]);
  }

  selectItem(item, isChild) {
    this.selectedItem = item.title;

    let index = this.dropdownMenuItems.findIndex(i => i.title === item.title);
    this.dropdownMenuItems.splice(index, 1);
    this.dropdownMenuItems.unshift(item);

    this.localStorageService.setModuleName(item.sref);

    setTimeout(() => {
      let topMenu = this.localStorageService.getTopMenu();
      if (topMenu !== '' && item.defaultMenu !== topMenu) {
        this.selectedTopMenu = topMenu;
      } else {
        this.selectedTopMenu = item.defaultMenu;
      }
      if (!isChild) {
        this.selectedTopMenu = item.defaultMenu;
        this.router.navigate(['/' + item.sref + '/' + this.selectedTopMenu]);
      }
      this.initMenu();
    }, 10);
  }

  addDropdownMenu(isAdmin) {
    let arr = [];
    this.dropdownMenuItems = [];
    if (isAdmin) {
      arr = [{ title: 'Settings', sref: 'settings', defaultMenu: 'lab' },
      { title: 'Libraries', sref: 'libraries', defaultMenu: 'insurance/companies' },
      { title: 'Tracking', sref: 'tracking', defaultMenu: 'order' }];
    } else {
      arr = [{ title: 'Dashboard', sref: 'dashboard', defaultMenu: 'order' },
      { title: 'Client Management', sref: 'clientManagement', defaultMenu: 'practice' },
      { title: 'Lab Management', sref: 'labManagement', defaultMenu: 'lab/labinsurance' }];
    }

    arr.forEach(item => {
      this.dropdownMenuItems.splice(this.dropdownMenuItems.length, 0, item);
    });

    let obj = {};
    if (isAdmin) {
      obj = { title: 'Settings', sref: 'settings', defaultMenu: 'lab' };
    } else {
      obj = { title: 'Dashboard', sref: 'dashboard', defaultMenu: 'order/lab' };
    }

    this.selectItem(obj, undefined)
  }


  initMenu() {
    this.topMenus = [];
    this.topMenus = this.routeService.getSettingTopMenu(this.selectedItem);
    let moduleName = this.localStorageService.getTopMenu();
    this.topMenus.forEach(topMenu => {
      if (topMenu.sref === moduleName) {
        topMenu.isActive = true;
      } else {
        topMenu.isActive = false;
      }
    })
  }

  filterData() {
    console.log('need to implement letter');
  }
}
