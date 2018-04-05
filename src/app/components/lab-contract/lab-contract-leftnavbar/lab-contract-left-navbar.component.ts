import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../../shared/route.service';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'lab-contract-left-navbar',
  templateUrl: './lab-contract-left-navbar.component.html',
})
export class LabContractLeftNavbarComponent implements OnInit {
  leftMenuItems = [];
  folderName: string = '';
  id: number = 0;
  labContractId: number;
  contractLabId: number;
  moduleName: string = '';

  constructor(
    public route: ActivatedRoute,
    public routeService: RouteService,
    private localStorageService: LocalStorageService) {
    this.folderName = 'labContract';
    this.localStorageService.setTopMenu(this.folderName);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'] || 0;
    this.moduleName = this.route.snapshot.params.moduleName;
    this.labContractId = this.route.snapshot.params['labContractId'] || 0;
    this.contractLabId = this.route.snapshot.params['contractLabId'] || 0;
    this.getLeftMenu();
    this.leftMenuItems = this.routeService.activateLeftMenu(this.leftMenuItems, this.route.snapshot.url);
  }

  getLeftMenu() {
    if ((this.labContractId === 0 && this.contractLabId === 0) || this.moduleName) {
      this.leftMenuItems = [
        { title: 'Lab Contract', sref: 'labContract', icon: 'users.svg', isActive: false },
        { title: 'Add Lab Contract', sref: 'labContract/contractLab', icon: 'users.svg', isActive: false },
        // { title: 'Lab Contract Graph', sref: 'labContract/graph', icon: 'users.svg', isActive: false }
      ]
    } else {
      this.leftMenuItems = [
        {
          title: 'Test Menu', sref: 'labContract/' + this.labContractId + '/contractLab/' + this.contractLabId,
          icon: 'users.svg', isActive: false
        },
        {
          title: 'Contract Documents', sref: 'labContract/' + this.labContractId + '/contractdocument/' + this.contractLabId,
          icon: 'users.svg', isActive: false
        },
        {
          title: 'Lab Orders', sref: 'labContract/' + this.labContractId + '/laborder/' + this.contractLabId,
          icon: 'users.svg', isActive: false
        }
      ]
    }
  }

  openComponent(item) {
    this.routeService.openRoute(item.sref);
  }
}
