import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'practice-type-left-navbar',
  templateUrl: './practice-type-left-navbar.component.html',
  styleUrls: ['./practice-type-left-navbar.component.css']
})
export class PracticeTypeLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  folderName: string = '';
  practiceId: number = 0;
  user: any;
  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.folderName = 'practice';
    this.localStorageService.setTopMenu(this.folderName + '/type');
  }

  ngOnInit() {
    this.leftMenuItems = [
      { title: 'Practice Type', sref: 'practice/type', icon: 'users.svg', isActive: false },
    ];
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
