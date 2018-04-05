import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../../core/shared/services';
import { RouteService } from './../../../../shared';
import { BillingCodeService } from './../../../billing-code/shared';
import { CustomDDO } from './../../../shared/models/custom-ddo.model';
import { Message } from 'primeng/primeng';
import { TestProfileService } from '../shared/test-profile.service';
import { CPTCodesService } from '../../../codes/shared/cptCodes.service';
import { ICDCodesService } from '../../../codes/shared/icdCodes.service';
import { TestProfileModel, TestProfileItemModel, TestProfileCPTICDMappingModel } from '../shared/test-profile.model'
import { DataTable, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'test-profile-edit',
  templateUrl: './test-profile-edit.component.html',
  // styleUrls: ['./test-profile-edit.component.css']
})

export class TestProfileEditComponent implements OnInit {

  public errorMessages: Message[] = [];
  public selectedCPTCodes: Array<any> = [];
  public CPTCodeList: Array<any> = [];
  public CPTCodeSuggestion: Array<any> = [];
  public cptIcdData: Array<any> = [];
  public selectedICDCodes: Array<any> = [];
  public ICDCodeList: Array<any> = [];
  public ICDCodeSuggestion: Array<any> = [];
  public gridData: Array<any> = [];
  public testProfileModel: TestProfileModel = new TestProfileModel();
  public isEdit: boolean = false;
  private rowIndex: number = 0;
  constructor(private testMenuProfileService: TestProfileService,
    private cptcodesService: CPTCodesService,
    private icdCodesService: ICDCodesService,
    private route: ActivatedRoute, private routeService: RouteService,
    private breadcrumbsService: BreadcrumbsService,
    private confirmationService: ConfirmationService) {

  }
  ngOnInit() {
    this.testProfileModel.Id = this.route.snapshot.params['id'] || 0;
    if (Number(this.testProfileModel.Id) > 0) {
      this.getTestProfileByID();
    } else {
      this.breadcrumbsService.breadcrumbs = 'Coverage Determination Profile / New';
    }
  }


  getTestProfileByID() {
    this.testMenuProfileService.getTestProfileById(this.testProfileModel.Id).then((testProfile) => {
      this.testProfileModel = testProfile.data;
      this.breadcrumbsService.breadcrumbs = this.testProfileModel.Name + ' / Edit';
      this.testProfileModel.TestProfileItems.map((item) => {
        let cptCode = item.CPTCodes.map((code) => {
          return code.Code;
        });
        let icdCode = item.ICD10Codes.map((code) => {
          return code.Code;
        })
        let cptCodeString = cptCode.toString();
        let icdCodeString = icdCode.toString();
        let obj = { CPTCode: cptCodeString, ICDCOde: icdCodeString };
        this.gridData.splice(this.gridData.length, 0, obj);
        this.gridData = [...this.gridData];
      });
    });
  }

  getCPTCodesOnSearch(event) {
    let query = event.query;
    if (query.length > 1) {
      this.cptcodesService.getCPTCodeBySearch(query).then((code) => {
        this.CPTCodeList = code.data;
        this.CPTCodeSuggestion = this.CPTCodeList;
        if (this.CPTCodeSuggestion.length === 0) {
          this.showErrorMessage('CPT code not valid');
        }
      })
    }
  }

  afterSelectCPT(selectedCPT) {
    let filteredCpt = this.selectedCPTCodes.filter((val) => {
      return val.Id === selectedCPT.Id;
    });
    if (filteredCpt.length === 2) {
      let index = this.selectedCPTCodes.indexOf(filteredCpt[1]);
      this.selectedCPTCodes.splice(index, 1);
    }
  }

  afterSelectICD(selectedICD) {
    let filteredIcd = this.selectedICDCodes.filter((val) => {
      return val.Id === selectedICD.Id;
    });
    if (filteredIcd.length === 2) {
      let index = this.selectedICDCodes.indexOf(filteredIcd[1]);
      this.selectedICDCodes.splice(index, 1);
    }
  }

  private getICDCodeOnSerach(event) {
    let query = event.query;
    if (query.length > 1) {
      this.icdCodesService.getICDCodeBySearch(query).then((code) => {
        this.ICDCodeList = code.data;
        this.ICDCodeSuggestion = this.ICDCodeList;
        if (this.ICDCodeSuggestion.length === 0) {
          this.showErrorMessage('ICD code not valid');
        }
      })
    }
  }

  onAdd(isEdit) {
    if (this.selectedCPTCodes.length === 0) {
      this.showErrorMessage('Please add CPT code');
      return;
    }
    if (this.selectedICDCodes.length === 0) {
      this.showErrorMessage('Please add ICD code');
      return;
    }
    let cptCode = this.selectedCPTCodes.map((code) => {
      return code.Code;
    });
    let icdCode = this.selectedICDCodes.map((code) => {
      return code.Code;
    })
    let cptCodeString = cptCode.toString();
    let icdCodeString = icdCode.toString();

    let cptCodeTrimedString = cptCode.toString().replace(/ /g, '');
    let icdCodeTrimedString = icdCode.toString().replace(/ /g, '');
    let combinedCodes = cptCodeTrimedString + icdCodeTrimedString;
    this.cptIcdData = JSON.parse(JSON.stringify(this.gridData));

    if (isEdit && this.cptIcdData.length > 0 && this.rowIndex > -1) {
      this.cptIcdData.splice(this.rowIndex, 1);
    }
    let dublicateCheck = this.cptIcdData.filter(element => {
      let cptCodeReplacedString = element.CPTCode.replace(/ /g, '');
      let icdCodeReplacedString = element.ICDCOde.replace(/ /g, '');
      let combinedReplacedString = cptCodeReplacedString + icdCodeReplacedString;
      return combinedReplacedString == combinedCodes;
    });

    if (dublicateCheck.length > 0) {
      this.showErrorMessage('Duplicate CPT Code and ICD Code combination.');
      return;
    }
    //  let cptCodeString = cptCode.toString().replace(/ /g,'');
    //  let icdCodeString = icdCode.toString().replace(/ /g,'');
    // icdCodeString.replace(/ /g,'')
    // cptCodeString.replace(/ /g,'')
    if (isEdit) {
      this.testProfileModel.TestProfileItems[this.rowIndex].CPTCodes = this.selectedCPTCodes;
      this.testProfileModel.TestProfileItems[this.rowIndex].ICD10Codes = this.selectedICDCodes;

      this.gridData[this.rowIndex].CPTCode = cptCodeString;
      this.gridData[this.rowIndex].ICDCOde = icdCodeString;
    } else {
      let obj = { CPTCode: cptCodeString, ICDCOde: icdCodeString };
      let testProfileItemModel = new TestProfileItemModel();
      testProfileItemModel.Id = 0;
      testProfileItemModel.CPTCodes = this.selectedCPTCodes;
      testProfileItemModel.ICD10Codes = this.selectedICDCodes;
      this.testProfileModel.TestProfileItems.push(testProfileItemModel);

      this.gridData.splice(this.gridData.length, 0, obj);
      this.gridData = [...this.gridData];
    }
    this.selectedCPTCodes = [];
    this.selectedICDCodes = [];
    this.isEdit = false;
  }

  editTestProfile(rowIndex) {
    this.rowIndex = rowIndex;
    this.selectedCPTCodes = this.testProfileModel.TestProfileItems[rowIndex].CPTCodes;
    this.selectedICDCodes = this.testProfileModel.TestProfileItems[rowIndex].ICD10Codes;
    this.isEdit = true;
  }

  // .replace(/ /g,'')

  onDeleteTestProfile(rowIndex: number) {
    if (this.testProfileModel.TestProfileItems[rowIndex].Id == 0) {
      this.testProfileModel.TestProfileItems.splice(rowIndex, 1);
      this.removeFromGrid(rowIndex);
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete ',
        icon: 'fa fa-trash',
        accept: () => {
          this.testProfileModel.TestProfileItems[rowIndex].IsDeleted = true;
          this.removeFromGrid(rowIndex);
        },
      });
    }
  }

  removeFromGrid(rowIndex) {
    this.gridData.splice(rowIndex, 1);
    this.gridData = [...this.gridData];
  }

  showErrorMessage(message: string) {
    this.errorMessages.push({
      severity: 'error',
      summary: 'Error Message', detail: message
    });
  }

  save() {
    if (this.testProfileModel.Name === '') {
      this.showErrorMessage('Please Enter Coverage Determination Profile');
      return;
    }

    if (this.testProfileModel.TestProfileItems.length === 0) {
      this.showErrorMessage('Please add CPT codes and ICD codes');
      return;
    }
    this.testMenuProfileService.saveTestProfile(this.testProfileModel).then((res) => {
      if (res) {
        this.routeService.openRoute('codes/coverageDeterminationProfile');
      }
    })
  }

  cancel() {
    this.routeService.openRoute('codes/coverageDeterminationProfile');
  }
}
