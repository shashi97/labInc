import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { UserModel, UserService } from '../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO } from './../../shared/models/custom-ddo.model';
import { LocalStorageService } from '../../../core/shared/services/index';
import { PaginationEnum, UserTypeEnum } from '../../shared/enums';
import { LabService } from '../../lab/shared/lab.service';
import { PracticeService } from '../../practice/shared/practice.service';
import { EmailValidateService } from '../../shared/services/email-validate.component'


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  public searchString: string = ''; // Search string variable for server side searching
  public labId: number; // Lab id for maintaing lab user
  public showUserType: boolean = true; // Show user type for identify user type
  public currentUser: any; // Getting current user details
  public errorMsg: Message[] = []; // Error message array
  public user: UserModel = new UserModel(); // User details model class
  // Gender array containg gender information
  public gender: Array<any> = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]; 
  // Martial status array containg martial status information
  public martialStatus: Array<any> = [{ label: 'Single', value: 'Single' }, { label: 'Married', value: 'Married' }];
  // Relationship array containg relationship list
  public relationshipList: Array<CustomDDO> = [];
  public RoleDDOs: Array<any> = [];  // Role array containg user role details
  private userInsuranceCompanies: Array<any>;
  public userTypeId: number = 0;
  public showShideMenu: boolean = true;
  private validateLoginFrom: boolean = true;
  private PracticeId: number;
  private selectedPracticeId: number = 0;
  private labName: string;
  public showLeftMenu: boolean = false;
  public isValid: boolean = true;
  constructor(public breadcrumbsService: BreadcrumbsService,
    private userService: UserService,
    private routeService: RouteService,
    private localStorageService: LocalStorageService,
    public route: ActivatedRoute, private labService: LabService,
    private practiceService: PracticeService, private emailValidateService: EmailValidateService) { }

  ngOnInit() {
    this.currentUser = this.localStorageService.getCurrentUser();
    this.currentUser = this.currentUser.User;
    this.user.Id = this.route.snapshot.params['id'] || 0;
    this.labId = this.route.snapshot.params['labId'] || 0;
    this.PracticeId = this.route.snapshot.params['practiceId'] === undefined ? 0 : this.route.snapshot.params['practiceId'];
    if (this.labId > 0) {
      if (this.user.Id == 0) {
        this.showUserType = false;
        this.user.LabName = this.currentUser.EntityName;
      }
    }
    if (this.PracticeId !== 0) {
      this.showShideMenu = true;
      this.validateLoginFrom = true;
    } else {
      this.showShideMenu = false;
      this.validateLoginFrom = false;
    }

    let user = this.localStorageService.getUserDetail();
    if (localStorage.moduleName === 'labManagement') {
      this.showLeftMenu = true;
      this.userTypeId = UserTypeEnum.Lab;
      this.user.LabId = user.LabId;
      this.user.EntityName = user.EntityName;
      this.user.UserTypeId = UserTypeEnum.Lab;
      this.user.LabName = this.user.EntityName;
      this.user.LinkedTableId = user.LinkedTableId;

    } else if (localStorage.moduleName === 'settings') {
      this.userTypeId = UserTypeEnum.InNetwork;
      this.user.UserTypeId = UserTypeEnum.InNetwork;
      if (this.labId > 0) {
        this.userTypeId = UserTypeEnum.Lab;
        this.user.LabId = this.labId;
        this.user.LinkedTableId = this.user.LabId;
        this.user.UserTypeId = UserTypeEnum.Lab;
      }
    } else if (localStorage.moduleName === 'clientManagement') {
      this.user.LinkedTableId = this.PracticeId;
      this.selectedPracticeId = this.user.LinkedTableId;
    } else {
      this.userTypeId = UserTypeEnum.Practice;
      this.user.UserTypeId = UserTypeEnum.Practice;
      this.user.LabId = user.LabId;
    }
    this.getDefaultParams();
    this.getRoleDDOs();

  }


  getDefaultParams() {
    let loggedUser = this.localStorageService.getUserDetail();

    if (this.user.Id > 0) {
      this.getUserById(this.user.Id);
    } else {
      if (this.labId > 0) {
        this.getLabName();
        this.user.LinkedTableId = this.labId;
      }
      if (this.user.Id === 0 && this.PracticeId > 0) {
        this.getPracticeName();
      }
      if (this.user.Id === 0 && this.labId > 0 && loggedUser.UserTypeId !== 2) {
        this.getLabName();
      }
      if (this.labId === 0 && this.PracticeId == 0 && this.user.Id == 0) {
        this.breadcrumbsService.breadcrumbs = 'User / New';
      }

    }
    if (this.user.Id == 0 && this.userTypeId == 1 && this.user.UserTypeId == 1) {
      this.user.RoleId = 1;
    }
  }

  private getRoleDDOs() {
    this.userService.getRoleDDOs(this.user.UserTypeId).then(result => {
      this.RoleDDOs = result.data;
      this.RoleDDOs.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    })
  }

  private getUserById(userId) {
    let loggedUser = this.localStorageService.getUserDetail();

    this.userService.getUserById(userId).then((result) => {
      this.user = result.data;

      if (Number(this.labId) === 0 && Number(this.PracticeId) === 0 && Number(this.user.Id) > 0) {
        this.breadcrumbsService.breadcrumbs = this.user.Name + ' / Edit';
      }
      if (loggedUser.UserTypeId === 2) {
        this.breadcrumbsService.breadcrumbs = this.user.Name + ' / Edit';
      }
      if (this.labId > 0 && this.PracticeId == 0 && loggedUser.UserTypeId !== 2) {
        this.getLabName();
      }
      if (this.PracticeId > 0) {
        this.getPracticeName()
      }




    });
  }

  getPracticeName() {
    this.practiceService.getPracticeById(this.PracticeId).then((practice) => {
      if (this.user.Id === 0) {
        this.breadcrumbsService.breadcrumbs = practice.data.Name + ' / User / New'
      } else {
        this.breadcrumbsService.breadcrumbs = practice.data.Name + ' / User /' + this.user.Name + ' / Edit';
      }

    })
  }

  onUserTypeSelect() {
    this.searchString = '';
    if (this.currentUser.UserTypeId == 1 || this.currentUser.UserTypeId == 2) {
      if (this.currentUser.UserTypeId == 1 && this.user.LinkedTableId == null) {
        this.user.LinkedTableId = this.labId;
      } else {
        this.user.LinkedTableId = null;
      }
    }
    if (this.user.Id == 0 && this.user.UserTypeId == 3) {
      this.user.LabName = this.labName;
    }
    if (localStorage.moduleName === 'labManagement') {
      this.user.LabName = this.user.EntityName;
      this.user.LinkedTableId = this.user.LabId;
    }
    if (localStorage.moduleName === 'settings') {
      if (this.labId > 0) {
        this.user.LinkedTableId = this.labId;
      }
    }
  }

  getLabName() {
    let user = this.localStorageService.getUserDetail();
    this.labService.getLabNameById(this.labId).then((lab) => {
      this.labName = lab.data.Name;
      if (this.labName && this.user.UserTypeId != 3) {
        this.user.EntityName = this.labName;
      }

      if (this.user.Id > 0 && this.labId > 0 && user.UserTypeId !== 2) {
        this.breadcrumbsService.breadcrumbs = this.labName + ' / User /' + this.user.Name + ' / Edit';
      } else if (this.user.Id == 0 && Number(this.labId) > 0 && user.UserTypeId !== 2) {
        this.breadcrumbsService.breadcrumbs = this.labName + ' / User / New';
      }
    });
  }
  showErrorMessage(message) {
    this.errorMsg.push({
      severity: 'error',
      detail: message
    });
  }
  public save(isValid) {
    this.isValid = false;
    let message = ''
    //   if (!isValid) {
    //  if (this.user.Email !== '') {
    //   if (!this.emailValidateService.validateEmail(this.user.Email)) {
    //     message = 'Email Id Not Valid';
    //       this.showErrorMessage(message);
    //     return
    //     }
    //   } else {
    //      message = 'Please Fill All Required Field';
    //        this.showErrorMessage(message);
    //     return
    //     } 
    // }
    if (this.user.Name === '' || this.user.PhoneNo === '' || this.user.Email === '') {
      message = 'Please Fill All Required Field';
      this.showErrorMessage(message);
      return
    }
    if (!this.emailValidateService.validateEmail(this.user.Email)) {
      message = 'Email Id Not Valid';
      this.showErrorMessage(message);
      return
    }
    // this.user.UserTypeId = parseInt(this.user.UserTypeId)
    // if (this.labId > 0) {
    //   // this.user.LabId = this.labId;
    //   this.user.UserTypeId = 2;
    // }
    if (this.PracticeId > 0) {
      this.user.LinkedTableId = this.PracticeId;
      this.user.UserTypeId = UserTypeEnum.Practice;
    }
    if (this.user.Id !== 0 && !this.user.Password) {
      this.user.Password = '';
    }
    if (this.user.Id !== 0 && !this.user.ConfirmPassword) {
      this.user.ConfirmPassword = '';
    }
    // if (this.user.Email !== '') {
    //   if (!this.emailValidateService.validateEmail(this.user.Email)) {
    //     this.errorMsg.push({
    //       severity: 'error',
    //       summary: 'Error Message', detail: 'Email Id Not Valid'
    //     });
    //     return;
    //   }
    // }
    if (this.user.Id === 0 && (this.user.Password === '' || this.user.ConfirmPassword === '')) {
      message = 'Please Enter Password And Confirm Password Field'
      this.showErrorMessage(message);
      return;
    }

    if (this.user.Password !== this.user.ConfirmPassword) {
      message = 'Password And Confirm Password Should Be Same'
      this.showErrorMessage(message);
      return;
    }
    if (this.user.Id == 0 && (this.currentUser.UserTypeId == 1 || this.currentUser.UserTypeId == 2)) {
      // if (this.user.UserTypeId == 2 && (!this.user.LabId || this.user.LabId == 0)) {
      //   this.errorMsg.push({
      //     severity: 'error',
      //     summary: 'Error Message', detail: 'Please Select Lab'
      //   });
      //   return;
      // }
      if (this.user.UserTypeId == 2 && (!this.user.LinkedTableId || this.user.LinkedTableId == 0)) {
        this.errorMsg.push({
          severity: 'error',
          summary: 'Error Message', detail: 'Please search and Please Select Lab'
        });
        return;
      }
      if (this.user.UserTypeId == 3 && (!this.user.LinkedTableId || this.user.LinkedTableId == 0)) {
        this.errorMsg.push({
          severity: 'error',
          summary: 'Error Message', detail: 'Please search and Please Select Lab'
        });
        return;
      }

      if (this.user.UserTypeId == 3 && (!this.selectedPracticeId || this.selectedPracticeId == 0)) {
        this.errorMsg.push({
          severity: 'error',
          summary: 'Error Message', detail: 'Please search and Please Select Practice'
        });
        return;
      }
      if (this.user.UserTypeId == 3 && this.selectedPracticeId > 0) {
        this.user.LinkedTableId = this.selectedPracticeId;
      }

    }
    if (this.currentUser.UserTypeId == UserTypeEnum.SalesOffice) {
      this.user.UserTypeId = UserTypeEnum.SalesOffice;
      this.user.LinkedTableId = this.currentUser.LinkedTableId;

    }
    if (this.user.Id == 0 && this.user.UserTypeId == 4 && !this.user.LinkedTableId) {
      this.errorMsg.push({
        severity: 'error',
        summary: 'Error Message', detail: 'Please search and select sales office.'
      });
      return;
    }
    this.userService.saveUser(this.user).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });


      if (this.validateLoginFrom) {
        this.routeService.openRoute('practice/' + this.PracticeId + '/' + this.labId + '/user');
      } else {
        if (this.labId > 0) {
          this.routeService.openRoute('lab/' + this.labId + '/user');
        } else {
          this.routeService.openRoute('user');
        }

      }

    });
  }

  public cancel(): void {


    if (this.validateLoginFrom) {
      this.routeService.openRoute('practice/' + this.PracticeId + '/' + this.labId + '/user');
    } else {
      if (this.labId > 0) {
        this.routeService.openRoute('lab/' + this.labId + '/user');
      } else {
        this.routeService.openRoute('user');
      }

    }
    // if (this.labId > 0) {
    //   this.routeService.openRoute('lab/' + this.labId + '/edit');
    // } else {
    //   this.routeService.openRoute('user/' + this.labId);
    // }
  }
  onSelectedLab(seletedLab) {
    this.user.LinkedTableId = seletedLab.Id;
    this.searchString = seletedLab.Name;
    // this.LabIdForPractice = this.user.LabId;
  }
  onSelectedPractice(seletedPractice) {
    // this.user.LinkedTableId = seletedPractice.Id;
    this.selectedPracticeId = seletedPractice.Id;

  }
  onSelectedSalesOffice(salesOffice) {
    this.user.LinkedTableId = salesOffice.Id;
  }
}
