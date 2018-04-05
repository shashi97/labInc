import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { SetupModel, SetupService } from './../shared/index';
import { Message } from 'primeng/primeng';
import { CPTCodesService } from './../../codes/shared/cptCodes.service';
import { CPTCodesModel } from './../../codes/cptCodes/shared/cptCodes.model';
import { CustomDDO, MasterService } from '../../shared';

@Component({
  selector: 'setup-edit',
  templateUrl: './setup-edit.component.html',
  styleUrls: ['./setup-edit.component.css']
})

export class SetupEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public setup: SetupModel = new SetupModel();
  public states: Array<CustomDDO> = [];

  constructor(public breadcrumbsService: BreadcrumbsService,
    public CPTCodesService: CPTCodesService,
    private routeService: RouteService,
    private masterService: MasterService,
    public route: ActivatedRoute,
    public setupService: SetupService) { }

  ngOnInit() {
    this.getDefaultParams();
    this.getStateDDOs();
  }

  getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
    });
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Add Setup';
  }

  private getCompoundProfileById(compoundId) {
    this.setupService.getCompoundProfileById(compoundId).then((result) => {
      this.setup = result.data;
    });
  }

  public save() {
    this.setupService.saveSetup(this.setup).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.routeService.openRoute('setups');
    });
  }

  public cancel(): void {
    this.routeService.openRoute('setups');
  }

}
