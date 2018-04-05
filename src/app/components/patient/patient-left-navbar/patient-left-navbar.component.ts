import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'patient-left-navbar',
  templateUrl: './patient-left-navbar.component.html',
  styleUrls: ['./patient-left-navbar.component.css']
})
export class PatientLeftNavbarComponent implements OnInit {
  leftMenuItems = [];
  folderName: string = '';
  patientId: number = 0;

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.folderName = 'patient';

    this.localStorageService.setTopMenu(this.folderName);
    let id = this.route.snapshot.params['id'];
    let patientId = this.route.snapshot.params['patientId'];

    if (this.route.snapshot.params['id']) {
      this.patientId = Number(this.route.snapshot.params['id']);
    } else if (this.route.snapshot.params['patientId']) {
      this.patientId = Number(this.route.snapshot.params['patientId']);
    }

    if (id && patientId) {
      this.patientId = patientId;
    }

    if (this.patientId !== 0) {
      this.leftMenuItems = [
        { title: 'Patient Info', sref: 'patient/' + this.patientId + '/view', icon: 'user-info.svg', isActive: false },
        { title: 'Insurances', sref: 'patient/' + this.patientId + '/insurance', icon: 'user-info.svg', isActive: false }
      ];
    } else {
      this.leftMenuItems = [
        { title: 'My Patients', sref: 'patient', icon: 'user-info.svg', isActive: false },
        { title: 'Add Patient', sref: 'patient/add', icon: 'user-info.svg', isActive: false }
      ];
    }
  }

  ngOnInit() {
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
