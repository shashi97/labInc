import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../../shared/route.service';
import { LocalStorageService } from '../../../../core/shared/services/index';

@Component({
  selector: 'lab-insurance-left-navbar',
  templateUrl: './lab-insurance-left-navbar.component.html'
})

export class LabInsuranceLeftNavbarComponent implements OnInit {
  leftMenuItems = [];
  leftMenuItemsEdit = [];
  folderName: string = 'lab';
  labInsuranceId: number = 0;
  @Output() onShowDialogEvent = new EventEmitter();

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.localStorageService.setTopMenu(this.folderName + '/labinsurance');
    this.labInsuranceId = Number(this.route.snapshot.params['labInsuranceId']) || 0;
  }

  ngOnInit() {
    this.getleftMenu();
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  getleftMenu() {
    if (this.labInsuranceId > 0) {
      this.leftMenuItems = [
        { title: 'Insurance Contracts', sref: 'lab/labinsurance', icon: 'users.svg', isActive: false },
        { title: 'Fee Schedule', sref: 'lab/' + this.labInsuranceId + '/feeSchedule', icon: 'users.svg', isActive: false }
      ];
    } else {
      this.leftMenuItems = [
        { title: 'Insurance Contracts', sref: 'lab/labinsurance', icon: 'users.svg', isActive: false },
        { title: 'Add Insurance Contract', sref: '', icon: 'users.svg', isActive: false }
      ];
    }
  }

  openComponent(item) {
    if (item.title === 'Add Insurance Contract') {
      this.onShowDialogEvent.emit(true);
    } else {
      this.routeService.openRoute(item.sref);
    }
  }

}
