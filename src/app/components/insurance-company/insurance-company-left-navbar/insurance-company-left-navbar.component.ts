import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'insurance-company-left-navbar',
  templateUrl: './insurance-company-left-navbar.component.html',
  styleUrls: ['./insurance-company-left-navbar.component.css']
})
export class InsuranceCompanyLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  leftMenuItemsEdit = [];
  folderName: string = '';
  id: number = 0;
  insuranceCompanyId: number = 0;
  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {

    this.folderName = 'insurance';
    this.localStorageService.setTopMenu(this.folderName + '/companies');

    // this.leftMenuItems = [
    //   { title: 'Insurance', sref: 'insurancecompany', icon: 'users.svg', isActive: false },
    //   { title: 'Add Insurance', sref: 'insurancecompany/add', icon: 'user-info.svg', isActive: false }
    // ];
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'] || 0;
    this.insuranceCompanyId = this.route.snapshot.params['insuranceCompanyId'] || 0;
    this.getleftMenu();
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  getleftMenu() {
    let urlPath = this.route.snapshot.url[0].path;
    if (this.id === 0) {

      if (urlPath === 'companies' || urlPath === 'type' || urlPath === 'gcCodes' || urlPath === 'tradingPartner') {
        this.leftMenuItems = [
          { title: 'Companies', sref: 'insurance/companies', icon: 'users.svg', isActive: false },
          { title: 'Company Type', sref: 'insurance/type', icon: 'users.svg', isActive: false },
          { title: 'Trading Partner', sref: 'insurance/tradingPartner', icon: 'users.svg', isActive: false }
        ];
      } else {
        this.leftMenuItems = [
          { title: 'Companies', sref: 'insurance/companies', icon: 'users.svg', isActive: false },
          { title: 'Add Insurance Company', sref: 'insurance/add', icon: 'users.svg', isActive: false }
        ];
      }

    } else {
      this.leftMenuItems = [
        { title: 'Company Info', sref: 'insurance/' + this.id + '/edit', icon: 'users.svg', isActive: false },
        {
          title: 'G Code & Coverage Determination Profile', sref: 'insurance/'
            + this.id + '/gcCodes', icon: 'users.svg', isActive: false
        }
        // ,{ title: 'Eligibility Criteria', sref: 'insurance/' + this.id + '/utilizationManagement', icon: 'users.svg', isActive: false }
      ];
    }

    if (this.insuranceCompanyId !== 0) {
      this.leftMenuItems = [
        { title: 'Company Info', sref: 'insurance/' + this.insuranceCompanyId + '/edit', icon: 'users.svg', isActive: false },
        {
          title: 'G Code & Coverage Determination Profile', sref: 'insurance/'
            + this.insuranceCompanyId + '/gcCodes', icon: 'users.svg', isActive: false
        }
        // , { title: 'Eligibility Criteria', sref: 'insurance/' + this.insuranceCompanyId + '/utilizationManagement',
        //  icon: 'users.svg', isActive: false }
      ];
    }


    // this.leftMenuItems = this.routeService.activateLeftTabMenu(this.leftMenuItems, this.leftMenuItems[0]);
  }

  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
