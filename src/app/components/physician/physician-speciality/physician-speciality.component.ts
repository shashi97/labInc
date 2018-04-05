import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTable, ConfirmationService } from 'primeng/primeng';
import { RouteService, PaginationService } from './../../../shared';
import { BreadcrumbsService } from './../../../core/shared/services';
import { Paginator } from './../../../core/paginator/paginator';
import { Message } from 'primeng/primeng';
import { PaginationEnum } from './../../shared/enums';
import { PhysicianSpeciality } from '../shared/physician.model';
import { PhysicianService } from '../shared/physician.service';

@Component({
  selector: 'physician-speciality',
  templateUrl: './physician-speciality.component.html',
  styleUrls: ['./physician-speciality.component.css']
})

export class PhysicianSpecialityComponent implements OnInit {
  @ViewChild(DataTable) dataTableComponent: DataTable;
  @ViewChild(Paginator) paginatorComponent: Paginator;
  public pageSize: number = PaginationEnum.PageSize;
  public totalRecords: number = 0;
  public errorMsg: Message[] = [];
  private errorDiv = '';
  private errormsg = '';
  public physicianSpecialitys: Array<PhysicianSpeciality> = [];
  public physicianSpeciality: PhysicianSpeciality = new PhysicianSpeciality();


  constructor(
    // public breadcrumbsService: BreadcrumbsService,
    public paginationService: PaginationService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public breadcrumbsService: BreadcrumbsService,
    public physicianService: PhysicianService
  ) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'Physician Speciality';
    this.getPhysicianSpeciality();
  }


  private deletePhysicianSpeciality(physicianSpeciality) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete - ' + physicianSpeciality.Name + ' ?',
      icon: 'fa fa-trash',
      accept: () => {
        this.physicianService.deletePhysicianSpecialityById(physicianSpeciality.Id).then(result => {
          this.getPhysicianSpeciality();
          this.errorMsg.push({ severity: 'success', summary: '', detail: 'Record deleted successfully' });
        })
      }
    });
  }

  public getPhysicianSpeciality() {
    this.physicianService.getPhysicianSpeciality(this.paginationService.getParams()).then(result => {
      this.physicianSpecialitys = result.data.Data;
      // this.prescribedMedicines =
      // [{ Id: 2, DrugName: "messi", isedit: false },
      // { Id: 3, DrugName: "sam", isedit: false }, { Id: 4, DrugName: "neymar", isedit: false }]
      this.totalRecords = result.data.TotalRecords;
      this.physicianSpecialitys.forEach(element => {
        element.isedit = false;
        return element;
      });
    })
  }
  public addPracticeType() {
    this.errorDiv = '';
    this.errormsg = '';
    this.errorMsg = [];
    this.physicianSpecialitys.forEach(element => {
      if (element.Id === 0) {
        if (element.Name !== '') {
          this.errormsg = 'Save Physician Speciality';
          this.errorMsg.push({
            severity: 'error', summary: 'Warn Message',
            detail: 'Sorry you can not add multiple new Physician Speciality, Please save first'
          });
          return;
        }
        this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Physician Speciality Name can not be blank' });
        this.errormsg = 'Physician Speciality can not blank';
        this.errorDiv = 'red';
        return;
      }
    })
    if (this.errormsg !== 'Physician Speciality can not blank' && this.errormsg !== 'Save Physician Specialitys') {
      this.physicianSpeciality = new PhysicianSpeciality();

      this.physicianSpecialitys = [ this.physicianSpeciality,...this.physicianSpecialitys];
      // this.prescribedMedicines.splice(0, 0, this.prescribedMedicine);
    }
  }

  private editPhysician(physicianSpeciality) {
    let count = 0;
    this.physicianSpecialitys.forEach(item => {
      if (item.isedit) {
        count++;
      }
    })
    if (count === 0) {
      physicianSpeciality.isedit = true
    } else {
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Please save or cancel the opened Item.' });
    }
  }

  public savePhysicianSpeciality(PhysicianSpecialityItem) {
    if (PhysicianSpecialityItem.Name === '') {
      this.errorDiv = 'red';
      this.errorMsg.push({ severity: 'error', summary: 'Warn Message', detail: 'Physician Speciality Name can not be blank' });
      return;
    }
    // this.prescribedMedicines = [...this.prescribedMedicines, PrescribedItem];
    this.physicianService.savePhysicianSpeciality(PhysicianSpecialityItem).then(result => {
      this.getPhysicianSpeciality();
    })
  }

  // public addCompoundProfile(): void {
  //   this.routeService.openRoute('compoundProfile/add');
  // }
  // public editCompoundProfile(id): void {
  //   this.routeService.openRoute('compoundProfile/' + id + '/edit');
  // }
  pageChanged(event) {
    this.paginationService.setPageChange(event);
    this.getPhysicianSpeciality();
  }

  /* call to sorting the grid data */
  onSorting(event) {
    this.paginationService.setSortExpression(event);
    this.getPhysicianSpeciality();
  }

  /* call to filter the grid data */
  onFiltering(event) {
    this.dataTableComponent.reset();
    this.paginatorComponent.first = 0;
    this.paginationService.setFilterValues(event.filters);
    this.getPhysicianSpeciality();
  }

}
