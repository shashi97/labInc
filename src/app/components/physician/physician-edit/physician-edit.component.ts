import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { PhysicianModel, PhysicianTypeModel } from '../shared/physician.model';
import { CustomDDO, MasterService } from '../../shared';
import { PhysicianService } from '../shared';
import { Message } from 'primeng/primeng';
import { PracticeService } from '../../practice/shared/practice.service';
import { EmailValidateService } from '../../shared/services/email-validate.component'

@Component({
  selector: 'app-physician-edit',
  templateUrl: './Physician-edit.component.html',
  styleUrls: ['./Physician-edit.component.css']
})

export class PhysicianEditComponent implements OnInit {

  public errorMessage: Message[] = [];
  public practiceId: number;
  public patientId: number;
  public physicianDetail: PhysicianModel = new PhysicianModel();
  public states: Array<CustomDDO> = [];
  public locations: Array<any> = [];
  public physicianSpecialities: Array<any> = [];
  constructor(public breadcrumbsService: BreadcrumbsService,
    private routeService: RouteService,
    private masterService: MasterService,
    public route: ActivatedRoute,
    public physicianService: PhysicianService,
    private practiceService: PracticeService,
    private emailValidateService: EmailValidateService
  ) { }

  ngOnInit() {
    this.physicianDetail.Id = this.route.snapshot.params['id'] || 0;
    this.practiceId = Number(this.route.snapshot.params['practiceId']) || 0;
    if (this.practiceId > 0) {
      this.getPracticeName();
    } else {
      this.breadcrumbsService.breadcrumbs = ' Physician / New';

    }
    if (this.physicianDetail.Id && this.physicianDetail.Id > 0) {
      this.getPhysicianDetails(this.physicianDetail.Id);
    } else {
      this.physicianDetail.Id = 0;
    }

    // this.getPhysicianType();
    this.getStateDDOs();
    this.getLocationOnPractice();
    this.getPhysicianSpecialityDDO();
  }

  public getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
    });
  }

  public getPhysicianSpecialityDDO() {
    this.physicianService.getPhysicianSpecialityDDO().then(result => {
      this.physicianSpecialities = result.data;
      this.physicianSpecialities.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    });
  }

  public getPhysicianDetails(physicianId): void {
    this.physicianService.getPhysicianById(Number(physicianId)).then(res => {
      this.physicianDetail = res.data;
      if (this.practiceId > 0) {
        this.getPracticeName();
      } else {

        this.breadcrumbsService.breadcrumbs = this.physicianDetail.Name + ' / Edit';
      }
    });
  }
  getPracticeName() {
    this.practiceService.getPracticeById(this.practiceId).then((practice) => {
      if (this.physicianDetail.Id === 0 && this.practiceId > 0) {
        this.breadcrumbsService.breadcrumbs = practice.data.Name + ' / Physician / New';
      } else if (this.physicianDetail.Id === 0 && this.practiceId === 0) {
        this.breadcrumbsService.breadcrumbs = ' Physician / New';
      } else {
        this.breadcrumbsService.breadcrumbs = practice.data.Name + ' / Physician /' + this.physicianDetail.Name + ' / Edit';
      }
    });
  }

  public getLocationOnPractice(): void {
    this.physicianService.getLocationOnPracticeId(this.practiceId).then(res => {
      res.data.map(location => {
        this.locations.splice(this.locations.length, -1, { label: location.LocationName, value: location.Id });
      })
    })
  }

  // /* get physician type */
  // public getPhysicianType(): void {
  //   this.PhysicianService.getPhysicianTypes().then(res => {
  //     this.PhysicianTypes = res.data;
  //   });
  // }
  showErrorMessage(message) {
    this.errorMessage.push({
      severity: 'error',
      detail: message
    });
  }
  /* save complete checklist data and redirect on main checklist grid page */
  public save(isValid) {
    let message = ''
    if (isValid) {
      if (this.physicianDetail.Email !== '') {
        if (!this.emailValidateService.validateEmail(this.physicianDetail.Email)) {
          message = 'Email Id Not Valid';
          this.showErrorMessage(message);
          return
        }
      }
    } else {
      message = 'Please Fill All Required Field';
      this.showErrorMessage(message);
      return
    }

    // if (this.physicianDetail.PhysicianSpecialityId === 0 || this.physicianDetail.PhysicianSpecialityId == null) {
    //   this.errorMessage.push({
    //     severity: 'error',
    //     summary: 'Error Message', detail: 'Please Select Physician Speciality'
    //   });
    //   return;
    // }

    this.physicianDetail.PracticeId = this.practiceId;
    this.physicianService.savePhysician(this.physicianDetail).then(res => {
      this.cancel();
      this.errorMessage.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
    });
  }

  /* will redirect on checklist grid page */
  cancel() {
    if (this.practiceId > 0) {
      this.routeService.openRoute('practice/' + this.practiceId + '/physician');
    } else {
      this.routeService.openRoute('physician');
    }
  }


}
