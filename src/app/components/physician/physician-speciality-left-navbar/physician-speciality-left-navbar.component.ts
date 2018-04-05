import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'physician-speciality-left-navbar',
  templateUrl: './physician-speciality-left-navbar.component.html',
  styleUrls: ['./physician-speciality-left-navbar.component.css']
})
export class PhysicianSpecialityLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  folderName: string = '';
  id: number = 0;

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {

    this.folderName = 'physician';
    this.localStorageService.setTopMenu(this.folderName + '/speciality');

    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.leftMenuItems = [
      { title: 'Physician Speciality', sref: 'physician/speciality', icon: 'users.svg', isActive: false },
    ];
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
