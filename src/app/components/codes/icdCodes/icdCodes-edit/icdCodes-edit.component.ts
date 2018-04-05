import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from '../../../../core/shared/services';
import { RouteService } from '../../../../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO } from '../../../shared/models/custom-ddo.model';
import { ICDCodesModel } from '../shared/icdCodes.model';
import { ICDCodesService } from '../../shared/icdCodes.service';

@Component({
  selector: 'app-icdcodes-edit',
  templateUrl: './icdCodes-edit.component.html'
})

export class ICDCodesEditComponent implements OnInit {
  private icdCodesModel: ICDCodesModel = new ICDCodesModel();
  public isEdit: boolean = false;
  errorMessage: Message [] = [];
  constructor(private CodesService: ICDCodesService, private breadcrumbsService: BreadcrumbsService,
    private route: ActivatedRoute, private routeService: RouteService) { }
  ngOnInit() {
    this.icdCodesModel.Id = this.route.snapshot.params['id'];
    if (Number(this.icdCodesModel.Id) > 0) {
      this.getICDCodeById();
    } else {
      this.breadcrumbsService.breadcrumbs = 'ICD Code / New';
      this.isEdit = true;
    }
  }

  getICDCodeById() {
    this.CodesService.getICDCodeById(Number(this.icdCodesModel.Id)).then(result => {
      this.icdCodesModel = result.data;
      this.breadcrumbsService.breadcrumbs = this.icdCodesModel.Code + ' / View';
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
    this.CodesService.saveICDCodes(this.icdCodesModel).then(result => {
      if (result) {
        this.routeService.openRoute('codes/icd');
      }
    })
  }

  cancel() {
    this.routeService.openRoute('codes/icd');
  }

  editICDCode() {
    this.isEdit = !this.isEdit
    if (this.isEdit) {
      this.breadcrumbsService.breadcrumbs = this.icdCodesModel.Code + ' / Edit';
    }
  }
}
