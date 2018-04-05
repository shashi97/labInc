import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from '../../../core/shared/services';
import { RouteService } from '../../../shared';
import { Message } from 'primeng/primeng';
import { CustomDDO, MasterService } from '../../shared';
import { LocationModel } from '../shared/location.model';
import { LocationService } from '../shared/location.service'
import { LocalStorageService } from '../../../core/shared/services/index';
import { PaginationEnum, UserTypeEnum } from '../../shared/enums';
import { PracticeService } from '../../practice/shared/practice.service';
import { EmailValidateService } from '../../shared/services/email-validate.component'

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',

})

export class LocationEditComponent implements OnInit {

  public locationModel: LocationModel = new LocationModel();
  public states: Array<CustomDDO> = [];
  public linkedTableId: number = 0;
  private validateLoginFrom: boolean = true;
  public errorMessage: Message[] = []

  constructor(private breadcrumbsService: BreadcrumbsService,
    private masterService: MasterService,
    private route: ActivatedRoute,
    private routeService: RouteService,
    private locationService: LocationService,
    private localStorageService: LocalStorageService,
    private practiceService: PracticeService,
    private emailValidateService: EmailValidateService) { }

  ngOnInit() {
    let user = this.localStorageService.getUserDetail();
    if (user.UserTypeId === UserTypeEnum.Practice) {
      this.locationModel.LinkedTableId = user.linkedTableId;
      this.validateLoginFrom = false;
    }
    this.getStateDDOs();
    this.locationModel.Id = Number(this.route.snapshot.params['id']) || 0;
    this.linkedTableId = Number(this.route.snapshot.params['practiceId']) || 0;
    this.locationModel.LinkedTableId = this.linkedTableId;
    if (Number(this.locationModel.Id) > 0) {
      this.getLocationById();
    } else if (this.locationModel.LinkedTableId > 0) {
      this.getPracticeName()
    } else {
      this.breadcrumbsService.breadcrumbs = 'Location / New';
    }
  }

  getStateDDOs() {
    this.masterService.getStateDDOs().then(result => {
      this.states = result;
    });
  }

  getLocationById() {
    this.locationService.getLocationById(this.locationModel.Id).then((res) => {
      this.locationModel = res.data;
      if (this.locationModel.LinkedTableId > 0 && this.validateLoginFrom) {
        this.getPracticeName()
      } else {
        this.breadcrumbsService.breadcrumbs = this.locationModel.LocationName + ' - '
          + this.locationModel.City + ' / Edit';
      }
    });
  }

  getPracticeName() {
    this.practiceService.getPracticeById(this.locationModel.LinkedTableId).then((practice) => {
      if (this.locationModel.Id === 0) {
        this.breadcrumbsService.breadcrumbs = practice.data.Name + ' / Location / New';
      } else {
        this.breadcrumbsService.breadcrumbs = practice.data.Name + ' / Location / ' + this.locationModel.LocationName + ' - '
          + this.locationModel.City + ' / Edit';
      }

    })
  }

  showErrorMessage(message) {
 this.errorMessage.push({
        severity: 'error',
        detail: message
      });
}

 public save(isValid) {
  let message = ''
    if (!isValid) {
       message = 'Please Fill All Required Field';
         this.showErrorMessage(message);
       return;
  }

    if (this.locationModel.LocationEmail !== '') {
      if (!this.emailValidateService.validateEmail(this.locationModel.LocationEmail)) {
        this.errorMessage.push({
          severity: 'warn',
          summary: 'Warn Message', detail: 'Email Id Not Valid'
        });
        return;
      }
    }
    this.locationService.saveLocation(this.locationModel).then((res) => {
      if (this.validateLoginFrom) {
        this.routeService.openRoute('practice/' + this.locationModel.LinkedTableId + '/location');
      } else {
        this.routeService.openRoute('location');
      }
    });
  }

  cancel() {
    if (this.validateLoginFrom) {
      this.routeService.openRoute('practice/' + this.locationModel.LinkedTableId + '/location');
    } else {
      this.routeService.openRoute('location');
    }
  }
}
