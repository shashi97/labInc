import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'physician-left-navbar',
  templateUrl: './Physician-left-navbar.component.html',
  styleUrls: ['./Physician-left-navbar.component.css']
})
export class PhysicianLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  folderName: string = '';
  id: number = 0;

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {

    this.folderName = 'physician';
    this.localStorageService.setTopMenu(this.folderName);

    this.id = this.route.snapshot.params['id'];
    if (this.id > 0) {
      this.leftMenuItems = [
        { title: 'Physician Info', sref: 'physician/' + this.id + '/edit', icon: 'users.svg', isActive: false },
      ];
    } else {
      this.leftMenuItems = [
        { title: 'My Physicians', sref: 'physician', icon: 'users.svg', isActive: false },
        { title: 'Add Physician', sref: 'physician/add', icon: 'user-info.svg', isActive: false }
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
