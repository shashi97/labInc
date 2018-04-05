import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { TestingMenuModel, TestingMenuService } from './../shared/index';
import { Message } from 'primeng/primeng';
import { PrescribedMedicineService } from '../../prescribed-drugs';
import { CustomDDO } from './../../shared/models/custom-ddo.model';

@Component({
  selector: 'testing-menu-edit',
  templateUrl: './testing-menu-edit.component.html',
  styleUrls: ['./testing-menu-edit.component.css']
})

export class TestingMenuEditComponent implements OnInit {

  public errorMsg: Message[] = [];
  public testingMenu: TestingMenuModel = new TestingMenuModel();
  public CPTCodesModel: Array<any>;
  public drugs: Array<CustomDDO> = [];
  public TestClassTypes: Array<any> = [];
  public selectedValue: string = 'Test'
  public TestModalities: Array<any> = [];
  public drugFamilies:Array<any>=[];
  
  constructor(public breadcrumbsService: BreadcrumbsService,
    private routeService: RouteService,
    private prescribedMedicineService: PrescribedMedicineService,
    public route: ActivatedRoute,
    public testingMenuService: TestingMenuService) { 
      this.getDrugfamily();
    }

  ngOnInit() {
    this.getDefaultParams();
    this.getDrugs(false);
    this.GetTestClassTypeDDO();
    this.GetTestModalityDDO();
  }

  getDefaultParams() {
    this.testingMenu.Id = this.route.snapshot.params['id'] || 0;
    if (this.testingMenu.Id > 0) {
      this.getTestingMenuById(this.testingMenu.Id);
    } else {
      this.breadcrumbsService.breadcrumbs = 'Testing Menu / New';
    }
  }

  private getTestingMenuById(testingId) {
    this.testingMenuService.getTestingMenuById(testingId).then((result) => {
      this.testingMenu = result.data;
      this.breadcrumbsService.breadcrumbs = this.testingMenu.ItemName + ' / Edit';
      if (this.testingMenu.IsAnalyte) {
        this.selectedValue = 'Drug';
        this.getDrugs(false);
      }
    });
  }

  getDrugs(isClick) {
    this.prescribedMedicineService.getDrugs().then(result => {
      let drugList = result.data;

      this.testingMenu.IsAnalyte = false
      if (this.selectedValue === 'Drug') {
        this.testingMenu.IsAnalyte = true;
      }
      this.drugs = [];
      drugList.forEach(drug => {
        let obj: CustomDDO = { label: drug.ClassName, value: drug.Id };
        if (this.testingMenu.IsAnalyte && drug.IsDrugClass) {
          this.drugs.splice(this.drugs.length, 0, obj);
        }
        if (!this.testingMenu.IsAnalyte && !drug.IsDrugClass) {
          this.drugs.splice(this.drugs.length, 0, obj);
        }
      });

      if (isClick) {
        this.testingMenu.DrugClassId = 0;
      }

    });
  }


  public save() {
    this.testingMenuService.saveTestingMenu(this.testingMenu).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.routeService.openRoute('testingMenu/testItem');
    });
  }
  public GetTestClassTypeDDO() {
    this.testingMenuService.GetTestClassTypeDDO().then((res) => {
     this.TestClassTypes= res.data;
     this.TestClassTypes.map((item) => {
      item.label = item.Name;
      item.value = item.Id;
    })
    });
  }
  public GetTestModalityDDO() {
    this.testingMenuService.GetTestModalityDDO().then((res) => {
     this.TestModalities= res.data;
     this.TestModalities.map((item) => {
      item.label = item.Name;
      item.value = item.Id;
    })
    });
  }

  public getDrugfamily(){
    this.testingMenuService.getDrugFamilyDDO().then((res)=>{
      this.drugFamilies=res.data;
      this.drugFamilies.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    })

  }
  //   getCPTCodes (){
  //   this.CPTCodesService.getCPTCodesForCompound().then(result =>{
  //    this.CPTCodesModel = result.data.Data;
  //    this.CPTCodesModel.map((item) =>{
  //       item.label = item.GeneName;
  //       item.value = item.Id;
  //    })
  //   })
  // }

  public cancel(): void {
    this.routeService.openRoute('testingMenu/testItem');
  }

}
