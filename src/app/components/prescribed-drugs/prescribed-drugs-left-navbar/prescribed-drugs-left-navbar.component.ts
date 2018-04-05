import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'prescribed-drugs-left-navbar',
  templateUrl: './prescribed-drugs-left-navbar.component.html',
  styleUrls: ['./prescribed-drugs-left-navbar.component.css']
})
export class PrescribedLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  folderName: string = 'drugs';

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.localStorageService.setTopMenu(this.folderName + '/prescribedDrugs');
  }

  ngOnInit() {
    this.getleftMenu();
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  getleftMenu() {
    this.leftMenuItems = [
      { title: 'Prescribed Drugs', sref: 'drugs/prescribedDrugs', icon: 'users.svg', isActive: false },
      { title: 'Drug/Test Class', sref: 'drugs/drugClass', icon: 'users.svg', isActive: false }
    ];
  }

  openComponent(item) {
    // this.leftMenuItems = this.routeService.activateLeftTabMenu(this.leftMenuItems, item);
    this.routeService.openRoute(item.sref);
  }
}
