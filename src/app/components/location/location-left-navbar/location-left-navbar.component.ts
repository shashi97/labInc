import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'location-left-navbar',
  templateUrl: './location-left-navbar.component.html',
  styleUrls: ['./location-left-navbar.component.css']
})
export class LocationLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  folderName: string = '';
  id: number = 0;

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {

    this.folderName = 'location';
    this.localStorageService.setTopMenu(this.folderName);

    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getLeftManus();
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  getLeftManus() {
    if (this.id > 0) {
      this.leftMenuItems = [
        { title: 'Location Info', sref: 'location/' + this.id + '/edit', icon: 'users.svg', isActive: false },
      ];
    } else {
      this.leftMenuItems = [
        { title: 'My Locations', sref: 'location', icon: 'users.svg', isActive: false },
        { title: 'Add Location', sref: 'location/add', icon: 'users.svg', isActive: false },
      ];
    }
  }

  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
