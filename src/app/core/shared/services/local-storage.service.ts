import { Injectable } from '@angular/core';
// import { } from '../../../components/patient/shared/patient.model'

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  public getCurrentUser() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser'));
    } else {
      return null;
    }
  }

  public getClassifiactionId() {
    let currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.User.ClassificationId
  }

  public getUserDetail() {
    let user = this.getCurrentUser();
    if (user) {
      return user.User;
    }
    return null;
  }

  public checkUserRole() {
    let user = this.getCurrentUser();
    let userType = '';
    if (user) {
      switch (user.User.UserTypeId) {
        case 1:
          userType = 'In_Network';
          break;
        case 2:
          userType = 'Lab';
          break;
        case 3:
          userType = 'Practice';
          break;
        case 4:
          userType = 'Sales_Office';
          break;
        case 5:
          userType = 'Sales_Representative';
          break;
        default:
          break;
      }
    }
    return userType;
  }

  public getAccessToken(): string {
    let currentUser = this.getCurrentUser();
    if (currentUser) {
      return 'Bearer ' + currentUser.access_token;
    }
    return '';
  }

  public setLoggedUser() {
    let user = this.getCurrentUser();
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  public setLabLogo(data) {
    localStorage.setItem('labLogo', JSON.stringify(data));
  }

  public getLabLogo() {
    return localStorage.getItem('labLogo');
  }

  public removeLogo() {
    localStorage.removeItem('labLogo');
  }

  public removeLoggedUser() {
    localStorage.removeItem('loggedUser');
  }

  public getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
  }

  public setCurrentUser(token) {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(token));
  }

  public getModuleName() {
    return localStorage.getItem('moduleName');
  }

  public setModuleName(moduleName: string) {
    localStorage.setItem('moduleName', moduleName);
  }

  public getTopMenu() {
    if (localStorage.getItem('selectedTopMenu')) {
      return localStorage.getItem('selectedTopMenu');
    } else {
      return '';
    }
  }

  public setTopMenu(selectedTopMenu: string) {
    localStorage.setItem('selectedTopMenu', selectedTopMenu);
  }

  public setBreadcrumbsValue(breadcrumbs: string) {
    localStorage.setItem('selectedBreadcrumbs', breadcrumbs);
  }

  public getBreadcrumbsValue() {
    return localStorage.getItem('selectedBreadcrumbs');
  }

  public removeLogin() {
    // remove user from local storage to log user out
    localStorage.removeItem('labLogo');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('moduleName');
    localStorage.removeItem('selectedTopMenu');
    localStorage.removeItem('loggedUser');
  }
}
