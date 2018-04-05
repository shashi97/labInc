import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { BreadcrumbsService } from './../../../core/shared/services';
import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from './../../shared';
import { SetupModel, SetupService } from './shared/index';
// import { PatientModel, PatientService, PatientPermission } from '../shared';
import { Message } from 'primeng/primeng';
import { PaginationEnum } from '../shared/enums';

@Component({
  selector: 'setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})

export class SetupComponent implements OnInit {
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public errorMessage: Message[] = [];
  public setups: Array<SetupModel> = new Array<SetupModel>();

  constructor(
    // public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public setupService: SetupService) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.getSetups();
  }


  private getSetups() {
    this.setupService.getSetups(this.paginationService.getParams()).then((result) => {
      this.setups = result.data.Data; // temp data from Molecular API
      // this.totalRecords = result.TotalRecords;
    });
  }

  deleteSetupById(compound) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + compound.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.setupService.deleteSetupById(compound.Id).then(result => {
          this.getSetups();
        })
      },
      reject: () => {
      }
    });

  }



  public addSetup(): void {
    this.routeService.openRoute('setup/add');
  }
  public editSetup(id): void {
    this.routeService.openRoute('setup/' + id + '/edit');
  }

}
