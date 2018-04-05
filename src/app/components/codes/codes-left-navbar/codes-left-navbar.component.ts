import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'codes-left-navbar',
  templateUrl: './codes-left-navbar.component.html'
})
export class CodesLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  folderName: string = '';
  id: number = 0;

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.folderName = 'codes';
    this.localStorageService.setTopMenu(this.folderName + '/cpt');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getleftMenu();
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  getleftMenu() {
    this.leftMenuItems = [
      { title: 'CPT Codes', sref: 'codes/cpt', icon: 'ic_billing_cpt.svg', isActive: false },
      { title: 'ICD Codes', sref: 'codes/icd', icon: 'ic_billing_icd.svg', isActive: false },
      { title: 'Coverage Determination Profiles', sref: 'codes/coverageDeterminationProfile', icon: 'ic_billing_icd.svg', isActive: false }
    ]
    // this.leftMenuItems = this.routeService.activateLeftTabMenu(this.leftMenuItems, this.leftMenuItems[0]);
  }

  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
