import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  CommonService,
  BreadcrumbsService,
  LocalStorageService
} from '../shared/services/index';
import { Message } from 'primeng/primeng';
import { LabModel, LabService } from '../../components/lab/shared';
import { RouteService } from '../../shared/';
import { TopNavbarComponent } from '../top-navbar/';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { TruncatePipe } from '../../components/shared';
import { PracticeService } from '../../components/practice';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, DoCheck {
  user: any = {};
  labDDO = [];
  currentTime: Date;
  public showDialog: boolean = false;
  searchLab: string = '';
  public logo: string = '';
  public labs: Array<LabModel> = [];
  public labId: number = 0;
  public headerName: string = '';
  public practiceName: string = '';
  breadcrumbs: string = 'No breadcrumbs';
  TopNavbarComponent: TopNavbarComponent;
  private subscription: Subscription;
  public errorMsg: Message[] = [];
  public loggedAsAdmin: boolean = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private breadcrumbsService: BreadcrumbsService,
    private commonService: CommonService,
    private practiceService: PracticeService,
    private labService: LabService,
    public route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    public routeService: RouteService) {
  }

  ngOnInit() {
    if (this.localStorageService.getLoggedUser()) {
      let loggedUser = this.localStorageService.getLoggedUser();
      this.user = loggedUser.User;
    } else {
      this.user = this.localStorageService.getUserDetail();
    }

    // if (this.user.UserTypeId === 3) {
    //   let practiceId = this.user.PracticeId;
    //   this.practiceService.getPracticeById(practiceId).then(result => {
    //     this.practiceName = result.data.Name;
    //   });
    // }
    this.currentTime = new Date();
    this.setLogo();
    this.getLabDDO();
  }

  ngDoCheck() {
    this.currentTime = new Date();
    if (this.breadcrumbsService.breadcrumbs) {
      this.breadcrumbs = this.breadcrumbsService.breadcrumbs;
    }
    this.setLogo();
  }

  setLogo() {
    let logo = this.localStorageService.getLabLogo();
    let moduleName = this.localStorageService.getModuleName();
    if (logo) {
      this.logo = logo.replace(/\"/g, "");
    }
  }

  logout() {
    this.localStorageService.removeLogin();
    this.router.navigate(['/login']);
  }

  openProfile(user) {
    let admin = this.localStorageService.getLoggedUser();
    let currentUser = this.localStorageService.getCurrentUser();
    this.errorMsg = [];
    if ((this.user.UserTypeId === 1 || this.user.User.UserTypeId === 1) && this.user.RoleId != 9) {
      this.showDialog = true;
    } else {
      this.showDialog = false;
      return;
    }
    this.labId = 0;
    this.getLabDDO();
    this.loggedAsAdmin = false;
    this.headerName = currentUser.User.LabName;
    if (currentUser.User.UserTypeId === 1 || (admin && currentUser.User.Id === admin.User.Id)) {
      this.loggedAsAdmin = true;
      this.headerName = currentUser.User.Name;
    }
  }

  searchLabByName() {
    this.labService.getLabsByName(this.searchLab).then(result => {
      this.labs = result.data;
    })
  }
  getLabDDO() {
    this.labService.getLabsDDO().then(result => {
      this.labDDO = result.data;
      this.labDDO.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    })
  }

  onLabSelect() {
    this.errorMsg = [];
    if (!this.labId) {
      this.errorMsg.push({
        severity: 'warn',
        summary: '', detail: 'Please Select Lab'
      });
      return;
    }
    this.authenticationService.changeLab(this.labId).then(result => {
      if (this.localStorageService.getLoggedUser() === null) {
        this.localStorageService.setLoggedUser();
      }
      this.commonService.notifyOther({ option: 'onSelected', value: 'Lab Login' });
      this.localStorageService.setCurrentUser(result.data);
      this.onLogoChange(this.labId);
    });
  }

  onLogoChange(id) {
    this.labService.getLogo(id).then(result => {
      this.localStorageService.setLabLogo(result.data.Icon);
      this.showDialog = false;
      this.setLogo();
    });
  }

  adminSignIn() {
    this.errorMsg = [];
    let admin = this.localStorageService.getLoggedUser();
    let currentUser = this.localStorageService.getCurrentUser();
    let isAdmin = false;
    if (currentUser.User.Id === admin.User.Id) {
      isAdmin = true;
      this.errorMsg.push({ severity: 'warn', summary: '', detail: 'Already Logged-In from Admin' });
    } else {
      this.logo = '';
      this.localStorageService.removeLogo();
      this.localStorageService.setCurrentUser(admin);
      this.localStorageService.removeLoggedUser();
      this.commonService.notifyOther({ option: 'onSelected', value: 'Admin Login' });
      this.showDialog = false;
    }
  }
}
