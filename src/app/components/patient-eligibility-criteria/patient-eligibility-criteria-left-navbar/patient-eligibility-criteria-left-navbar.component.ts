import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'patient-eligibility-criteria-left-navbar',
  templateUrl: './patient-eligibility-criteria-left-navbar.component.html',
  styleUrls: ['./patient-eligibility-criteria-left-navbar.component.css']
})
export class PatientEligibilityCriteriaLeftNavbarComponent implements OnInit {
  leftMenuItems = [];
  leftMenuItemsEdit = [];
  folderName: string = '';
  id: number = 0;
  userId: number = 0;
  patientUtilizationId: number;
  @Input() isUserAdd: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.folderName = 'utilizationManagement';
    this.localStorageService.setTopMenu(this.folderName + '/patientCondition');
    this.id = this.route.snapshot.params['patientConditionId'] || 0;
    this.patientUtilizationId = this.route.snapshot.params['patientUtilizationId'] || 0;
  }
  ngOnInit() {
    this.getleftMenu();
    this.leftMenuItems = this.routeService.activateLeftAllMenu(this.leftMenuItems, this.route.snapshot.url);
  }
  getleftMenu() {
    if (this.id > 0) {
      this.leftMenuItems = [
        { title: 'Patient Conditions', sref: 'utilizationManagement/patientCondition', icon: 'users.svg', isActive: false },
        {
          title: 'Patient Test Eligibility'
          , sref: 'utilizationManagement/eligibilityCriteria', icon: 'users.svg', isActive: false
        },
        {
          title: 'Utilization Profile', sref: 'utilizationManagement/patientUtilizationProfile'
          , icon: 'users.svg', isActive: false
        }


        // { title: 'Users', sref: 'PatientEligibilityCriteria/' + this.id + '/user', icon: 'users.svg', isActive: false }
      ];
    } else {
      this.leftMenuItems = [
        { title: 'Patient Conditions', sref: 'utilizationManagement/patientCondition', icon: 'users.svg', isActive: false },
        // { title: 'Eligibility Criteria', sref: 'utilizationManagement', icon: 'users.svg', isActive: false },
        { title: 'Patient Test Eligibility', sref: 'utilizationManagement/eligibilityCriteria', icon: 'users.svg', isActive: false },
        {
          title: 'Utilization Profile', sref: 'utilizationManagement/patientUtilizationProfile',
          icon: 'users.svg', isActive: false
        }
      ];
    }

    if (this.patientUtilizationId) {
      if (Number(this.patientUtilizationId) === 0) {
        this.leftMenuItems = [
          { title: 'Patient Conditions', sref: 'utilizationManagement/patientCondition', icon: 'users.svg', isActive: false },
          {
            title: 'Patient Test Eligibility'
            , sref: 'utilizationManagement/eligibilityCriteria', icon: 'users.svg', isActive: false
          },
          {
            title: 'Utilization Profile', sref: 'utilizationManagement/patientUtilizationProfile', icon: 'users.svg', isActive: false
          }

          // { title: 'Users', sref: 'PatientEligibilityCriteria/' + this.id + '/user', icon: 'users.svg', isActive: false }
        ];
      } else {

        this.leftMenuItems = [
          { title: 'Patient Conditions', sref: 'utilizationManagement/patientCondition', icon: 'users.svg', isActive: false },
          {
            title: 'Patient Test Eligibility'
            , sref: 'utilizationManagement/eligibilityCriteria', icon: 'users.svg', isActive: false
          },
          {
            title: 'Utilization Profile', sref: 'utilizationManagement/patientUtilizationProfile', icon: 'users.svg', isActive: false
          }

          // { title: 'Users', sref: 'PatientEligibilityCriteria/' + this.id + '/user', icon: 'users.svg', isActive: false }
        ];
      }
    }

  }
  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
