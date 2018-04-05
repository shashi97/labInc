import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from '../../../../core/shared/services';
import { RouteService } from '../../../../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO } from '../../../shared/models/custom-ddo.model';
import { CPTCodesModel } from '../shared/cptCodes.model';
import { CPTCodesService } from '../../shared/cptCodes.service';

@Component({
  selector: 'app-cptcodes-edit',
  templateUrl: './cptCodes-edit.component.html'
})

export class CPTCodesEditComponent implements OnInit {
  public cptcodesModel: CPTCodesModel = new CPTCodesModel();
  public isEdit: boolean = false;
  errorMessage : Message [] =[]

  constructor(private CodesService: CPTCodesService, private breadcrumbsService: BreadcrumbsService,
    private route: ActivatedRoute, private routeService: RouteService) { }
  ngOnInit() {

    this.cptcodesModel.Id = this.route.snapshot.params['id'] || 0;
    if (Number(this.cptcodesModel.Id) > 0) {
      this.getCPTCodeById();
    } else {
      this.isEdit = true;
      this.breadcrumbsService.breadcrumbs = 'CPT Code / New';
    }
  }

  getCPTCodeById() {
    this.CodesService.getCPTCodeById(Number(this.cptcodesModel.Id)).then(result => {
      this.cptcodesModel = result.data;
      this.breadcrumbsService.breadcrumbs = this.cptcodesModel.Code + ' / View';

    })
  }
showErrorMessage(message) {
 this.errorMessage.push({
        severity: 'error',
        detail: message
      });
}
  save(isValid) {
     let message = ''
    if (!isValid) {
       message = 'Please Fill All Required Field';
         this.showErrorMessage(message);
      return
  }
    this.CodesService.saveCptCodes(this.cptcodesModel).then(result => {
      if (result) {
        this.routeService.openRoute('codes/cpt');
      }
    })
  }
  editCPTCode() {
    this.isEdit = !this.isEdit
    if (this.isEdit) {
      this.breadcrumbsService.breadcrumbs = this.cptcodesModel.Code + ' / Edit';
    }
  }
  cancel() {
    this.routeService.openRoute('codes/cpt');
  }
}
