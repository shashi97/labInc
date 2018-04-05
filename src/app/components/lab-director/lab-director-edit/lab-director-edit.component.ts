import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { LabDirectorModel, LabDirectorService } from '../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO, MasterService } from './../../shared';
import { EmailValidateService } from '../../shared/services/email-validate.component'
import { LabService } from '../../lab/shared/lab.service';
import { LocalStorageService } from '../../../core/shared/services/index';


@Component({
  selector: 'app-lab-director-edit',
  templateUrl: './lab-director-edit.component.html',
  styleUrls: ['./lab-director-edit.component.css']
})

export class LabDirectorEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public labDirector: LabDirectorModel = new LabDirectorModel();
  public states: Array<CustomDDO> = [];
  public type: string;
  public gender: Array<any> = [{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }];
  public martialStatus: Array<any> = [{ label: 'Single', value: 'Single' }, { label: 'Married', value: 'Married' }];
  // private emailPattern = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$';
  private labName: string = '';
  private labId : number = 0
  public InsuranceStateLevel;
  public LabDirectorStateLevel;
  public LabDirectorStates;
  constructor(public breadcrumbsService: BreadcrumbsService,
    private labDirectorService: LabDirectorService,
    private routeService: RouteService,
    private masterService: MasterService,
    public route: ActivatedRoute,
    private emailValidateService: EmailValidateService,
    private localStorageService: LocalStorageService,
    private labService: LabService) {

  }

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
    this.breadcrumbsService.breadcrumbs = 'Add Lab Director';
    this.labDirector.Id = Number(this.route.snapshot.params['labDirectorId']) || 0;
    this.labDirector.LabId = Number(this.route.snapshot.params['labId']) || 0;
    this.labId = this.labDirector.LabId;
    this.type = this.route.snapshot.params['type'] || '';
    // this.labDirector.Id = this.route.snapshot.params['id'] || 0;
    if (this.labDirector.LabId > 0) {
      this.getLabName();
    }
    if (this.labDirector.Id > 0 && this.labDirector.LabId === 0) {
      this.getLabDirectorById(this.labDirector.Id);
    }
    if (this.labDirector.Id === 0 && this.labDirector.LabId === 0) {
      this.breadcrumbsService.breadcrumbs = ' Lab Director / New';
    }
  }

  getLabName() {
    this.labService.getLabNameById(this.labDirector.LabId).then((lab) => {
      this.labName = lab.data.Name;
      if (this.labDirector.Id > 0 && this.labDirector.LabId > 0) {
        this.getLabDirectorById(this.labDirector.Id);
      }
      if (this.labDirector.Id === 0 && this.labDirector.LabId > 0) {
        this.breadcrumbsService.breadcrumbs = this.labName + ' / Lab Director / New';
      }

    })
  }

  // public fileChangeEvent(fileInput: any) {
  //   let FR = new FileReader();
  //   FR.onload = (e) => {
  //     this.labDirector.Icon = fileInput.target.files[0].name;
  //     this.labDirector.Icon = (e.target as any).result;
  //   };
  //   FR.readAsDataURL(fileInput.target.files[0]);
  // }

  private getLabDirectorById(labDirectorId) {
    this.labDirectorService.getLabDirectorById(labDirectorId).then((result) => {
      this.labDirector = result.data;
      this.LabDirectorStateLevel = this.labDirector.LabLicenseStateLevel;
      this.LabDirectorStates = this.labDirector.StateIds;
      if (this.labDirector.LabId > 0 && this.labId > 0) {
        this.breadcrumbsService.breadcrumbs = this.labName + ' / Lab Director / ' + this.labDirector.Name + ' / Edit';
      } else {
        this.breadcrumbsService.breadcrumbs = this.labDirector.Name + ' / Edit';
      }
    });
  }

  // private getInsuranceDDO() {
  //   this.labDirectorService.getInsuranceDDO().then((result) => {
  //     this.labDirectorInsuranceCompanies = result.data;
  //     this.labDirectorInsuranceCompanies.map((item) => {
  //       item.labDirectorel = item.CompanyName;
  //       item.value = item.Id;
  //     })
  //   });
  // }

  showErrorMessage(message) {
    this.errorMsg.push({
      severity: 'error',
      detail: message
    });
  }
  public save(isValid) {
    let message = ''
    if (!isValid) {
      if (this.labDirector.Email !== '') {
        if (!this.emailValidateService.validateEmail(this.labDirector.Email)) {
          message = 'Email Id Not Valid';
          this.showErrorMessage(message)
          return
        }
      } else {
        message = 'Please Fill All Required Field';
        this.showErrorMessage(message);
        return
      }
    }
    if (this.labDirector.Zip) {
      this.labDirector.Zip = Number(this.labDirector.Zip)
    }
    if (this.labDirector.LabLicenseStateLevel == 3 && (this.labDirector.StateIds.length == this.states.length || this.labDirector.StateIds.length == 0)) {
      message = 'Please Select National Lab Director Location Because You Have Not Seleted Any Except States';
      this.showErrorMessage(message);
      return
    }
    if (this.labDirector.LabLicenseStateLevel == 1 && this.labDirector.StateIds.length == 0) {
      message = 'Please Select Multi State Lab Director Locations';
      this.showErrorMessage(message);
      return
    }
    if (this.labDirector.LabLicenseStateLevel == 0 && (!this.labDirector.StateIds || this.labDirector.StateIds.length == 0)) {
      message = 'Please Select Lab Director Licensed State';
      this.showErrorMessage(message);
      return
    }
    this.labDirectorService.saveLabDirector(this.labDirector).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      console.log(this.labId )
      if (this.labDirector.LabId > 0 && this.labId > 0) {
        this.routeService.openRoute('lab/' + this.labDirector.LabId + '/labdirector');
      } else {
        this.routeService.openRoute('labDirector');
      }
    });
  }

  public cancel(): void {
    if (this.labDirector.LabId > 0  && this.labId > 0) {
      this.routeService.openRoute('lab/' + this.labDirector.LabId + '/labdirector');
    } else {
      this.routeService.openRoute('labDirector');
    }
  }
  onStateChange(value) {
    this.labDirector.LabLicenseStateLevel = value.InsuranceStateType;
    this.labDirector.StateIds = value.InsuranceCompanyStates;
  }
}
