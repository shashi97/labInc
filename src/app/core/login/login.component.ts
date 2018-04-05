import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, LocalStorageService } from '../shared/services/index';
import { RouteService } from '../../shared';
import { CommonService } from '../shared/services/common.service';
import { Token, Login } from './login.model';
import { Message } from 'primeng/primeng';
import { LabService } from '../../components/lab/shared';
import { PracticeService } from '../../components/practice';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})

export class LoginComponent implements OnInit {

  model: Login = new Login();
  loading = false;
  returnUrl: string;
  token: Token;
  public message: string;
  public defaultMenu: string = 'dashboard';
  public moduleName: string = 'dashboard';
  public messages: Array<Message> = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public routeService: RouteService,
    private commonService: CommonService,
    private practiceService: PracticeService,
    private labService: LabService,
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.message = this.route.snapshot.params['message'];
    let currentUser = this.localStorageService.getCurrentUser();
    if (currentUser) {
      // logged in so return true
      if (this.localStorageService.getModuleName()) {
        this.moduleName = this.localStorageService.getModuleName();

        let selectedModule = this.routeService.topModuleMenus().filter(val => val.sref === this.moduleName)[0];
        if (selectedModule) {
          this.defaultMenu = selectedModule.defaultMenu;
        }
      }

      this.returnUrl = this.checkUserRole();
      this.router.navigate([this.returnUrl]);
    } else {
      // reset login status
      this.localStorageService.removeLogin();
      this.returnUrl = '/' + this.moduleName + '/' + this.defaultMenu;
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.returnUrl;
    }

  }

  checkUserRole() {
    let isUser = this.localStorageService.checkUserRole();
    let userRoleType = this.localStorageService.getUserDetail();
    switch (isUser) {
      case 'In_Network':
        if (userRoleType.RoleId == 9) {
          this.moduleName = 'dashboard';
          this.defaultMenu = 'order';
          break;
        } else {
          this.moduleName = 'settings';
          this.defaultMenu = 'lab';
          break;
        }
      case 'Lab':
        this.moduleName = 'dashboard';
        this.defaultMenu = 'order';
        break;
      case 'Practice':
        this.moduleName = 'orderManagement';
        this.defaultMenu = 'order';
        break;
      case 'Sales_Office':
        this.moduleName = 'orderManagement';
        this.defaultMenu = 'order';
        break;
      case 'Sales_Representative':
        this.moduleName = 'orderManagement';
        this.defaultMenu = 'order';
        break;
    }
    return '/' + this.moduleName + '/' + this.defaultMenu;
  }

  login() {
    if (this.model.UserName === '') {
      this.messages.push({ severity: 'warn', summary: '', detail: 'UserName required!' });
      return;
    }
    if (this.model.Password === '') {
      this.messages.push({ severity: 'warn', summary: '', detail: 'Password required!' });
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.model.UserName, this.model.Password).then(result => {
      this.token = result.data;
      // login successful if there's a jwt token in the response
      if (this.token && this.token.access_token) {
        /* store user details and jwt token in local
         * storage to keep user logged in between page refreshes */
        this.localStorageService.setCurrentUser(this.token);
      }
      if (this.token.User.UserTypeId === 3) {
        this.practiceService.getPracticeById(this.token.User.LinkedTableId).then(result2 => {
          this.token.User.PracticeName = result2.data.Name;
          this.localStorageService.setCurrentUser(this.token);
          this.setCurrentUser();
        });
      } else if (this.token.User.UserTypeId === 2) {
        this.labService.getLogo(this.token.User.LinkedTableId).then(result2 => {
          this.localStorageService.setLabLogo(result2.data.Icon);
          this.setCurrentUser();
        });
      } else {
        this.setCurrentUser();
      }

    }).catch(error => {
      this.loading = false;
      this.messages.push({ severity: 'error', summary: '', detail: error.ValidatonResult });
    });
  }

  setCurrentUser() {
    this.returnUrl = this.checkUserRole();
    let splitUrl = this.returnUrl.split('/')[1];
    if (splitUrl) {
      this.localStorageService.setModuleName(splitUrl);
    }
    this.router.navigate([this.returnUrl]);
    this.loading = false;
  }

  public routeForReset() {
    this.router.navigate(['forgot']);
  }
}
