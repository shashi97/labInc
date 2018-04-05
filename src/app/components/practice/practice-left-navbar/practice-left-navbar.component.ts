import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'practice-left-navbar',
  templateUrl: './practice-left-navbar.component.html',
  styleUrls: ['./practice-left-navbar.component.css']
})
export class PracticeLeftNavbarComponent implements OnInit {

  leftMenuItems = [];
  folderName: string = '';
  practiceId: number = 0;
  user: any;
  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {

    this.folderName = 'practice';
    this.localStorageService.setTopMenu(this.folderName);

    this.user = this.localStorageService.getUserDetail();
    if (this.route.snapshot.params['id']) {
      this.practiceId = Number(this.route.snapshot.params['id']);
    } else if (this.route.snapshot.params['practiceId']) {
      this.practiceId = Number(this.route.snapshot.params['practiceId']);
    }

    if (this.route.snapshot.params['practiceId']) {
      this.practiceId = Number(this.route.snapshot.params['practiceId']);
    }
  }

  ngOnInit() {
    this.getLeftMenus();

  }

  getLeftMenus() {
    if (this.practiceId !== 0) {
      this.leftMenuItems = [
        { title: 'Practice Info', sref: 'practice/' + this.practiceId + '/edit', icon: 'users.svg', isActive: false },
        { title: 'Location', sref: 'practice/' + this.practiceId + '/location', icon: 'users.svg', isActive: false },
        { title: 'Physician', sref: 'practice/' + this.practiceId + '/physician', icon: 'users.svg', isActive: false },
        // { title: 'Physician / Location Association', sref: '', icon: 'users.svg', isActive: false },
        {
          title: 'Practice User', sref: 'practice/' + this.practiceId + '/' + this.user.LabId + '/user',
          icon: 'users.svg', isActive: false
        }
      ];
      this.checkActiveMenu();
    } else {
      let user = this.localStorageService.getUserDetail();
      if (user.UserTypeId == 5) {
        this.leftMenuItems = [
          { title: 'My Practices', sref: 'practice', icon: 'users.svg', isActive: false },
        ];
      } else {
      this.leftMenuItems = [
        { title: 'My Practices', sref: 'practice', icon: 'users.svg', isActive: false },
        { title: 'Add Practice', sref: 'practice/add', icon: 'users.svg', isActive: false }
      ];
     
    }
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }
  }

  checkActiveMenu() {
    let url = this.route.snapshot.url[1].path;
    if (url === 'location' || url === 'physician') {
      url = '/practice/' + this.practiceId + '/' + url;
      this.activatePracticeLeftMenu(url);
    } else if ((this.route.snapshot.url[2] && this.route.snapshot.url[2].path === 'user') || this.route.snapshot.url[1].path === 'user') {
      url = '/practice/' + this.practiceId + '/' + this.user.LabId + '/user';
      this.activatePracticeLeftMenu(url);
    } else {
      this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
    }
  }

  activatePracticeLeftMenu(url: string) {
    this.leftMenuItems.forEach(function (val) {
      if ('/' + val.sref === url) {
        val.isActive = true;
      } else {
        val.isActive = false;
      }
    })
  }

  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
