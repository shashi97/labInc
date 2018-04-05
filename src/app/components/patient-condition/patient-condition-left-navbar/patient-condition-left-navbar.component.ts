import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'patient-condition-left-navbar',
  templateUrl: './patient-condition-left-navbar.component.html',
  styleUrls: ['./patient-condition-left-navbar.component.css']
})
export class PatientConditionLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  leftMenuItemsEdit = [];
  folderName: string = '';
  id: number = 0;
  @Input() insuranceCompanyId: number = 0;
  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {

    this.folderName = 'patientCondition';
    this.localStorageService.setTopMenu(this.folderName);

    // this.leftMenuItems = [
    //   { title: 'Insurance', sref: 'insurancecompany', icon: 'users.svg', isActive: false },
    //   { title: 'Add Insurance', sref: 'insurancecompany/add', icon: 'user-info.svg', isActive: false }
    // ];
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'] || 0;
    this.getleftMenu();
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  
  getleftMenu() {
    this.leftMenuItems = [
      { title: 'Patient Conditions', sref: 'patientCondition', icon: 'users.svg', isActive: false }
    ];
  }

  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
