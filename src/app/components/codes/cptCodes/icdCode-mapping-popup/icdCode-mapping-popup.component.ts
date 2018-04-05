import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from '../../../../core/shared/services';
import { RouteService } from '../../../../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO } from '../../../shared/models/custom-ddo.model';
import { CPTCodesModel, ICD10CodeModel } from '../shared/cptCodes.model';
import { CPTCodesService } from '../../shared/cptCodes.service';

@Component({
  selector: 'app-icdCode-mapping-popup',
  templateUrl: './icdCode-mapping-popup.component.html',
  styleUrls: ['./icdCode-mapping-popup.component.css']
})

export class ICDCodeMappingPopupComponent implements OnInit, OnChanges {
  public cptcodesModel: CPTCodesModel = new CPTCodesModel();
  public isEdit: boolean = false;
  errorMessage: Message[] = [];
  dialogTitle: string = 'ICD Code Mapping';
  @Input() cptIcdCodeMapping: Array<ICD10CodeModel>;
  @Input() searchText: string = '';
  @Input() totalCptCode: number;
  @Input() totalRecords: number;
  @Input() insuranceCompanyId: number;
  @Input() parent: string;
  @Input() showErrorMessage: boolean;
  @Output() showErrorMessageChange = new EventEmitter();
  @Output() icd10CodeChange = new EventEmitter();
  ICD10CodeIds: Array<number> = [];
  @Input() icd10Codes: Array<any> = [];
  @Input() showIcdCodeMapping: boolean;
  @Input() cptCodeId: number;
  @Output() getIcdCodeOnCptLabId = new EventEmitter();
  @Output() showIcdCodeMappingChange = new EventEmitter();
  @Output() onSearchIcdCode = new EventEmitter();
  @Output() searchTextChange = new EventEmitter();
  constructor(private codesService: CPTCodesService, private breadcrumbsService: BreadcrumbsService,
    private route: ActivatedRoute, private routeService: RouteService) { }
  ngOnInit() {

    // this.cptcodesModel.Id = this.route.snapshot.params['id'];
    // if (Number(this.cptcodesModel.Id) > 0) {
    //   // this.getCPTCodeById();
    // } else {
    //   this.isEdit = true;
    //   this.breadcrumbsService.breadcrumbs = 'CPT Code / New';
    // }
  }

  ngOnChanges() {
   
    if (this.showIcdCodeMapping) {
      //  this.getIcdCodeDetail();
    }
  }

  public getIcdCodeDetail(): void {
    this.codesService.getIcdCodeDetail(this.cptCodeId).then(res => {
      this.cptIcdCodeMapping = res.data;
      this.cptIcdCodeMapping.map(cpt => {
        cpt.isChecked = false;
      })
    })
  }
  editCPTCode() {
    this.isEdit = !this.isEdit
    if (this.isEdit) {
      this.breadcrumbsService.breadcrumbs = this.cptcodesModel.Code + ' / Edit';
    }
  }
  cancel() {
    this.showIcdCodeMapping = false;
    this.showIcdCodeMappingChange.emit(false)
  }
  saveIcdCodeMapping() {
    this.ICD10CodeIds = [];
    let cptCodeICDCodeMapping;
    this.cptIcdCodeMapping.map(res => {
      if (res.isChecked) {
        this.ICD10CodeIds.splice(this.ICD10CodeIds.length, -1, res.Id);
      }
    })
    cptCodeICDCodeMapping = {
      ICD10CodeIds: this.ICD10CodeIds,
      CPTCodeId: this.cptCodeId,
      InsuranceCompanyId: this.insuranceCompanyId
    }
    this.showErrorMessage = true;
    this.showErrorMessageChange.emit(true);
    this.codesService.saveIcdCodeMapping(cptCodeICDCodeMapping).then(response => {
      this.cancel();
      this.getIcdCodeOnCptLabId.emit();
    })
  }

  onVisibleChange() {
    this.cancel();
  }
  onSelectIcdCode() {
    this.saveIcdCodeMapping();
  }

  searchIcdCode() {
    this.searchTextChange.emit(this.searchText);
    this.onSearchIcdCode.emit(this.searchIcdCode)
  }

  addIcdCodeMapping() {
    this.icd10Codes = [];
    this.cptIcdCodeMapping.map(res => {
      if (res.isChecked) {
        this.icd10Codes.splice(this.icd10Codes.length, -1, res);
      }
    })
    this.cancel();
    this.icd10CodeChange.emit(this.icd10Codes);

  }
}
