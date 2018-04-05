// Import Injectable Decorator
import { Injectable, OnInit } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { LeftMenu } from '../components/shared/models/left-navbar.model';
import { DefaultRole, UserTypeEnum } from '../components/shared/enums/base.enum';
import { LocalStorageService } from '../core/shared/services/index';


// Use @Injectable() to declare the RouteService class as an Injectable
@Injectable()
export class RouteService implements OnInit {

  leftMenuItems: Array<LeftMenu> = [];
  user: any;
  userType: string;
  constructor(public router: Router,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.user = this.localStorageService.getUserDetail();
    if (this.user.UserTypeId === UserTypeEnum.Lab) {
      this.userType = 'lab';
    }
    if (this.user.UserTypeId === UserTypeEnum.InNetwork) {
      this.userType = 'inNetwork';
    }
  }

  getLeftMenus() {
    return this.leftMenuItems;
  }

  activateLeftMenu(leftMenus: LeftMenu[], snapshotUrls: UrlSegment[]) {
    let url = '';
    snapshotUrls.forEach(function (urlSegment) {
      url = url + '/' + urlSegment.path;
    });
    let moduleName = this.localStorageService.getModuleName();
    let topMenu = this.localStorageService.getTopMenu();
    topMenu = topMenu.split('/')[0];
    leftMenus.forEach(function (val) {
      if ('/' + val.sref === '/' + topMenu + url) {
        val.isActive = true;
      } else {
        val.isActive = false;
      }
    })
    this.leftMenuItems = leftMenus;
    return leftMenus;
  }

  activateLeftAllMenu(leftMenus: LeftMenu[], snapshotUrls: UrlSegment[]) {
    let url = snapshotUrls[0].path;
    let topMenu = this.localStorageService.getTopMenu();
    topMenu = topMenu.split('/')[0];
    leftMenus.forEach(function (val) {
      if ('/' + val.sref === '/' + topMenu + '/' + url) {
        val.isActive = true;
      } else {
        val.isActive = false;
      }
    })
    this.leftMenuItems = leftMenus;
    return leftMenus;
  }

  openRoute(stateUrl) {
    this.router.navigate(['/' + this.localStorageService.getModuleName() + '/' + stateUrl]);
  }

  topModuleMenus() {
    let userType = this.localStorageService.checkUserRole();
    let arr = [];
    let userRoleType = this.localStorageService.getUserDetail();
    switch (userType) {
      case 'In_Network':
        if (userRoleType.RoleId == 9) {
          arr = [
          { title: 'Dashboard', sref: 'dashboard', defaultMenu: 'order' }];
        } else {
          arr = [{ title: 'Settings', sref: 'settings', defaultMenu: 'lab' },
          { title: 'Libraries', sref: 'libraries', defaultMenu: 'insurance/companies' },
          { title: 'Test Libraries', sref: 'testLibraries', defaultMenu: 'codes/cpt' },
          { title: 'Tracking', sref: 'tracking', defaultMenu: 'order' }];
        }
        break;
      case 'Lab':
        arr = [{ title: 'Dashboard', sref: 'dashboard', defaultMenu: 'order/lab' },
        { title: 'Client Management', sref: 'clientManagement', defaultMenu: 'practice' },
        { title: 'Lab Management', sref: 'labManagement', defaultMenu: 'lab/labinsurance' }];
        break;
      case 'Practice':
        arr = [{ title: 'Order Management', sref: 'orderManagement', defaultMenu: 'order' },
        { title: 'Practice Settings', sref: 'practiceSettings', defaultMenu: 'user' }];
        break;
      case 'Sales_Office':
        arr = [{ title: 'Order Management', sref: 'orderManagement', defaultMenu: 'order' },
        { title: 'Settings', sref: 'settings', defaultMenu: 'practice' }];
        break;
      case 'Sales_Representative':
        arr = [{ title: 'Order Management', sref: 'orderManagement', defaultMenu: 'order' },
        { title: 'Settings', sref: 'settings', defaultMenu: 'practice' }];
        break;
    }
    return arr;
  }

  getSettingTopMenu(selectedItem) {
    let arr = [];
    switch (selectedItem) {
      case 'Dashboard':
        arr = this.getDashboardTopMenu();
        break;
      case 'Client Management':
        arr = this.getClientTopMenu();
        break;
      case 'Lab Management':
        arr = this.getLabTopMenu();
        break;
      case 'Settings':
        arr = this.getSettingMenu();
        break;
      case 'Libraries':
        arr = this.getLibraryTopMenu();
        break;
      case 'Test Libraries':
        arr = this.getTestLibraryTopMenu();
        break;
      case 'Tracking':
        arr = this.getTrackingTopMenu();
        break;
      case 'Order Management':
        arr = this.getOrderTopMenu();
        break;
      case 'Practice Settings':
        arr = this.getPracticeTopMenu();
        break;
    }
    return arr;
  }

  getTestLibraryTopMenu() {
    return [
      {
        title: 'Billing Codes',
        sref: 'codes/cpt',
        isActive: false
      },
      {
        title: 'Testing Menu List',
        sref: 'testingMenu/testItem',
        isActive: false
      },
      {
        title: 'Prescribed Medications',
        sref: 'drugs/prescribedDrugs',
        isActive: false
      }
    ];
  }

  getSettingMenu() {
    let userType = this.localStorageService.checkUserRole();
    if (userType === 'Sales_Office') {
      return [
        {
          title: 'Laboratories',
          sref: 'lab',
          isActive: false
        },
        {
          title: 'Sales Representatives',
          sref: 'salesRepresentative',
          isActive: false
        },
        {
          title: 'Practice List',
          sref: 'practice',
          isActive: false
        },
        {
          title: 'Users',
          sref: 'user',
          isActive: false
        }
      ];
    } else if (userType === 'Sales_Representative') {
      return [
        {
          title: 'Laboratories',
          sref: 'lab',
          isActive: false
        },
        {
          title: 'Practice List',
          sref: 'practice',
          isActive: false
        }
      ];
    } else {
      return [
        {
          title: 'Network Laboratories',
          sref: 'lab',
          isActive: false
        },
        {
          title: 'Sales Offices',
          sref: 'salesOffice',
          isActive: false
        },
        {
          title: 'Users',
          sref: 'user',
          isActive: false
        }
      ];
    }
  }

  getLibraryTopMenu() {
    return [
      {
        title: 'Insurance',
        sref: 'insurance/companies',
        isActive: false
      },
      {
        title: 'Practice Type',
        sref: 'practice/type',
        isActive: false
      },
      {
        title: 'Physician Speciality',
        sref: 'physician/speciality',
        isActive: false
      }
      ,
      {
        title: 'Utilization Management',
        sref: 'utilizationManagement/patientCondition',
        isActive: false
      }

      // {
      //   title: 'Test Modality',
      //   sref: 'testModality/modality',
      //   isActive: false
      // },
      // {
      //   title: 'Test Class Type',
      //   sref: 'testClassType/classType',
      //   isActive: false
      // }
    ];
  }





  getClientTopMenu() {
    return [
      {
        title: 'Practice List',
        sref: 'practice',
        isActive: false
      }
    ];
  }

  getLabTopMenu() {
    return [
      {
        title: 'Insurance Contracts',
        sref: 'lab/labinsurance',
        isActive: false
      },
      {
        title: 'Referral Contracts',
        sref: 'labContract',
        isActive: false
      },
      {
        title: 'Testing Menu',
        sref: 'labtest/individual',
        isActive: false
      },
      {
        title: 'Users',
        sref: 'user',
        isActive: false
      },
      {
        title: 'Sales Offices',
        sref: 'salesOffice',
        isActive: false
      },
      {
        title: 'Directors',
        sref: 'labDirector',
        isActive: false
      }
    ];
  }

  getOrderTopMenu() {
    let userType = this.localStorageService.checkUserRole();
    if (userType == 'Sales_Office' || userType == 'Sales_Representative') {
      return [
        {
          title: 'Search Orders',
          sref: 'order',
          isActive: false
        }

      ];
    } else {
      return [
        {
          title: 'Create New Order',
          sref: 'order/add',
          isActive: false
        },
        {
          title: 'Search Orders',
          sref: 'order',
          isActive: false
        },
        {
          title: 'Patient List',
          sref: 'patient',
          isActive: false
        }
      ];
    }
  }

  getPracticeTopMenu() {
    return [
      {
        title: 'User list',
        sref: 'user',
        isActive: false
      },
      {
        title: 'Physician List',
        sref: 'physician',
        isActive: false
      },
      {
        title: 'Location List',
        sref: 'location',
        isActive: false
      }
      // , {
      //   title: 'Patient Conditions',
      //   sref: 'utilizationManagement/patientCondition',
      //   isActive: false
      // }
    ];
  }

  getDashboardTopMenu() {
    let userRoleType = this.localStorageService.getUserDetail();
    if (userRoleType.RoleId == 9) {
      return [
        {
          title: 'Search Orders',
          sref: 'order',
          isActive: false
        },
        {
          title: 'Order Review',
          sref: 'order/orderReview',
          isActive: false
        }]
    } else {
      return [
        {
          title: 'Dashboard',
          sref: 'dashboard',
          isActive: false
        },
        {
          title: 'Order Search',
          sref: 'order',
          isActive: false
        }
      ];
    }
  }
  getTrackingTopMenu() {

    let userRoleType = this.localStorageService.getUserDetail();
    if (userRoleType.RoleId == 9) {
      return [
        {
          title: 'Search Orders',
          sref: 'order',
          isActive: false
        },
        {
          title: 'Order Review',
          sref: 'order/orderReview',
          isActive: false
        }]
    } else {
      return [
        // {
        //   title: 'Orders Dashboard',
        //   sref: 'notfound',
        //   isActive: false
        // },
        {
          title: 'Search Orders',
          sref: 'order',
          isActive: false
        },
        {
          title: 'Order Review',
          sref: 'order/orderReview',
          isActive: false
        },
        // {
        //   title: 'Revenue Metrics',
        //   sref: 'notfound',
        //   isActive: false
        // },
        {
          title: 'Order Simulation',
          sref: 'order/orderSimulation',
          isActive: false
        },
        {
          title: ' Simulation',
          sref: 'insurance/insuranceSimulation',
          isActive: false
        }
      ];
    }
  }
}

