import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { OrderService } from '../shared';
import { OrderModel, OrderTest, ProcessingLabDetail, NeoOrder, OrderSimulation } from '../shared/order.model';
import { Message } from 'primeng/primeng';
import { LocalStorageService } from '../../../core/shared/services/index';
import { LabService } from '../../lab/shared/lab.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-order-simulation',
  templateUrl: './order-simulation.component.html',
  styleUrls: ['./order-simulation.component.css']
})
export class OrderSimulationComponent implements OnInit {
  public groupTests: Array<any> = [{ label: 'Add Individual Panel', value: 0 }];
  private items: Array<any> = [{ isColor: 'false' },
  { isColor: 'true' }, { isColor: 'false' }, { isColor: 'false' }, { isColor: 'false' }, { isColor: 'false' },
  { isColor: 'false' }, { isColor: 'false' }, { isColor: 'false' }, { isColor: 'false' }, { isColor: 'false' }
  ];
  public simulationStep: Array<any> = [];
  public isSimulateSave: boolean = false;
  public isShowPractice: boolean = true;
  private orderSimulation: OrderSimulation = new OrderSimulation();
  public tempTest: Array<any> = [];
  public tempValidity: Array<any> = [];
  public errorMessage: Array<any> = [];
  public tests: Array<any> = [];
  public validities: Array<any> = [];
  public insuranceType: Array<any> = [];
  public groupValidityList: Array<any> = [];
  public newGroupValidityList: Array<any> = [];
  public groupTestsList: Array<any> = [];
  public newGroupTestList: Array<any> = [];
  public patients: Array<any> = [];
  public selectedPatientId: number;
  public labList: SelectItem[];
  public practiceList: Array<any> = [];
  public selectedLabId: number = 0;
  public selectedPracticeId: number = 0;
  public patientInsurance: Array<any> = [];
  public isSelectGroupTest: boolean = false;
  public isTestScreenEmpty: boolean = false;
  public isValidityTestEmpty: boolean = false;
  public isLabEmpty: boolean = false;
  public isPracticeEmpty: boolean = false;
  public isPatientEmpty: boolean = false;
  public isGroupTestEmpty: boolean = false;
  constructor(public orderService: OrderService,
    public labService: LabService,
    public routeService: RouteService
  ) {
    this.getLabDDO();
  }
  ngOnInit() {


    this.getInsuranceType();


    // this.getInsuranceType();
  }

  public getGroupTest(): void {
    this.groupTests = [];
    this.groupTestsList = [];
    this.newGroupTestList = [];
    this.tests = [];
    this.newGroupValidityList = [];
    this.validities = [];
    this.groupValidityList = [];
    this.orderService.getGroupTestByLabId(this.orderSimulation.LabId).then(res => {
      if (res.data.length > 0) {
        res.data.map(groupTest => {
          this.groupTests.splice(this.groupTests.length, -1, { label: groupTest.GroupTestName, value: groupTest.Id });
        })
      }


    });
  }
  public getInsuranceType(): void {
    this.orderService.getInsuranceType().then(res => {
      this.insuranceType = res.data;
      this.orderSimulation.InsuranceTypeId = this.insuranceType[0].Id;
      // this.getPatientList();
    });

  }
  public getLabDDO(): void {
    this.labService.getLabsDDO().then(res => {
      this.labList = [];
      if (res.data.length > 0) {
        res.data.map((item) => {
          this.labList.splice(this.labList.length, -1, { label: item.Name, value: item.Id })
        })
      }

    });
  }
  public getPracticeDDO(): void {
    this.patients = [];
    this.practiceList = [];
    this.groupTests = [];
    this.patientInsurance = [];
    this.labService.getPracticeDDOByLab(this.orderSimulation.LabId).then(res => {
      if (res.data.length > 0) {
        res.data.map(practice => {
          this.practiceList.splice(this.practiceList.length, -1, { label: practice.Name, value: practice.Id })
        })
      }
      this.getGroupTest();
    });
  }
  public getPatientList() {
    this.patientInsurance = [];
    this.orderService.getPatientListByPractice(this.orderSimulation.PracticeId).then(res => {
      // this.patients = res.data;
      this.patients = [];
      if (res.data.length > 0) {
        res.data.map(patient => {
          this.patients.splice(this.patients.length, -1, { label: patient.FirstName + ' ' + patient.LastName, value: patient.Id });
        })
      }
    });
  }
  public onSelectPatient(): void {
    this.orderService.getInsuranceByPatientId(
      this.orderSimulation.PatientId, this.orderSimulation.InsuranceTypeId).then(res => {
        // this.patientInsurance = res.data;
        this.patientInsurance = [];
        res.data.map(insurance => {
          this.patientInsurance.splice(this.patientInsurance.length, 0, { label: insurance.InsuranceCompanyName, value: insurance.Id })
        });
      })
  }
  public onSelectLab(): void {
    this.orderService.getInsuranceByPatientId(
      this.orderSimulation.PatientId, this.orderSimulation.InsuranceTypeId).then(res => {
        // this.patientInsurance = res.data;
        this.patientInsurance = [];
        res.data.map(insurance => {
          this.patientInsurance.splice(this.patientInsurance.length, 0, { label: insurance.InsuranceCompanyName, value: insurance.Id })
        });
      })
  }



  public onSelectGroupTest() {
    this.onSelectGroup().then(res => {
      if (this.tempTest.length > 0) {
        this.tempTest.map(test => {
          let getDetail = this.groupTestsList.filter(group => {
            return group.value === test.value
          });
          if (getDetail.length === 0) {
            this.tests.splice(this.tests.length, -1, test);
          }
        })
      }

      if (this.tempValidity.length > 0) {
        this.tempValidity.map(testValidity => {
          let getTest = this.groupValidityList.filter(validity => {
            return validity.value !== testValidity.value
          });
          if (getTest.length === 0) {
            this.validities.splice(this.validities.length, -1, testValidity);
          }
        })
      }
    })

  }


  public onSelectGroup() {

    let promise = new Promise((resolve, reject) => {
      this.groupTestsList = [];
      this.newGroupTestList = [];
      this.tests = [];
      this.newGroupValidityList = [];
      this.validities = [];
      this.groupValidityList = [];
      this.orderService.GetGroupTesteByIdAndLabId(this.orderSimulation.GroupTestId, this.orderSimulation.LabId).then(res => {
        this.isSelectGroupTest = true;
        res.data.map((res1, index) => {
          if (Number(res1.Status) === 2 && res1.TestingType === 1) {
            this.groupTestsList.splice(this.groupTestsList.length, -1, { label: res1.ItemName, value: res1.Id });
            this.tests.splice(this.tests.length, -1, { value: this.groupTestsList[this.groupTestsList.length - 1].value, status: 2 });
          }
          if (Number(res1.Status) === 1 && res1.TestingType === 1) {
            this.newGroupTestList.splice(this.newGroupTestList.length, -1, { label: res1.ItemName, value: res1.Id, allreadyAdd: false });
          }
          if (Number(res1.Status) === 2 && res1.TestingType === 2) {
            this.groupValidityList.splice(this.groupValidityList.length, -1, { label: res1.ItemName, value: res1.Id });
            this.validities.splice(this.validities.length, -1,
              { value: this.groupValidityList[this.groupValidityList.length - 1].value, status: 2 });
          }
          if (Number(res1.Status) === 1 && res1.TestingType === 2) {
            this.newGroupValidityList.splice(this.newGroupValidityList.length, -1, {
              label: res1.ItemName, value: res1.Id,
              allreadyAdd: false
            });
          }
        })
        resolve(true);
      });
    });
    return promise;

  }


  private removeTest(index, Id, type) {
    switch (type) {
      case 'Validity':
        this.tempValidity.findIndex(temp => {
          return temp.value === Id;
        })
        this.validities.splice(index, 1);
        let findValidityIndex = this.tempValidity.findIndex(validity => {
          return validity.value === Id
        });
        if (findValidityIndex !== -1) {
          this.tempValidity.splice(findValidityIndex, 1);
        }
        break;
      case 'Test':
        this.tests.splice(index, 1);
        let findIndex = this.tempTest.findIndex(validity => {
          return validity.value === Id
        });
        if (findIndex !== -1) {
          this.tempTest.splice(findIndex, 1);
        }
        break;
      default:
        break;
    }
    // this.groupTestsList.splice(index, 1);
  }

  private addCompoundProfile(): void {

    //  this.isStatusZero = true;
    this.tests.splice(this.tests.length, -1, { value: null, status: 1 });
    this.isTestScreenEmpty = false;
    // let id = this.orderDetail.Tests.length;
    // let obj = { Id: id, OrderId: 0, TestId: 0, isNew: true, PrimaryPhysicianId: 0 }
    // this.groupTestsList.splice(this.groupTestsList.length, 0, obj);
  }

  public addValidityTest(): void {
    this.validities.splice(this.validities.length, -1, { value: null, status: 1 })
    this.isValidityTestEmpty = false;
  }

  private onSelectValidityOrder(physicianId, index): void {
    let filterPhysician = [];
    if (physicianId) {


      filterPhysician = this.validities.filter((compound, index1) => {
        return compound.value === physicianId && index1 !== index
      })
    }
    if (filterPhysician.length > 0) {
      this.errorMessage.splice(this.errorMessage.length - 1, 0,
        { severity: 'error', detail: 'Selected validity Already Exist' });
      this.validities[index].value = null;
    }

    if (filterPhysician.length === 0 && physicianId) {
      let filterTest = this.validities.filter(res => {
        return res.status === 1;
      })
      if (filterTest.length > this.tempValidity.length || this.tempValidity.length === 0) {
        this.tempValidity.splice(this.tempValidity.length, -1, { value: physicianId, status: 1 });
      }
    }
  }

  private onSelectTestOrder(physicianId, index): void {
    let filterPhysician = [];
    if (physicianId) {


      filterPhysician = this.tests.filter((compound, index1) => {
        return compound.value === physicianId && index1 !== index
      })
    }
    if (filterPhysician.length > 0) {
      this.errorMessage.splice(this.errorMessage.length - 1, 0,
        { severity: 'error', detail: 'Selected Test Already Exist' });
      this.tests[index].value = null;
    }
    if (filterPhysician.length === 0 && physicianId) {
      let filterTest = this.tests.filter(res => {
        return res.status === 1;
      })
      if (filterTest.length > this.tempTest.length || this.tempTest.length === 0) {
        this.tempTest.splice(this.tempTest.length, -1, { value: physicianId, status: 1 });
      }
    }


  }

  setColor(item) {
    let style;
    style = {
      'background-color': item.Labs.length === 0 ? 'red' : 'white'
    }
    return style;
  }

  setLabelColor(item) {
    let style;
    style = {
      'color': item.Labs.length === 0 ? 'red' : 'black'
    }
    return style;
  }




  public saveOrderSimulation(isDraft, isReview) {

    this.orderSimulation.Tests = [];
    this.orderSimulation.ValidationTests = [];
    this.isLabEmpty = false;
    this.isPracticeEmpty = false;
    this.isPatientEmpty = false;
    this.isGroupTestEmpty = false;
    this.isTestScreenEmpty = false;
    this.tests.map(compound => {
      // if (compound.status === 1) {

      let itemName = '';
      let item = this.groupTestsList.filter(res => {
        return res.value === compound.value;
      });
      if (item.length === 0) {
        item = this.newGroupTestList.filter(res => {
          return res.value === compound.value;
        });
      }
      if (item.length > 0) { itemName = item[0].label };

      if (compound.value) {
        this.orderSimulation.Tests.splice(this.orderSimulation.Tests.length, 0, {
          OrderId: 0, TestId: compound.value, ProcessingLabId: 0, StatusId: 0,
          IsGroupTest: compound.status === 2 ? true : false, TestingType: 0, ItemName: itemName,
        })
      }
      // }
    });

    this.validities.map(validity => {
      //   if (validity.status === 1) {

      let itemName = '';
      let item = this.groupValidityList.filter(res => {
        return res.value === validity.value;
      });
      if (item.length === 0) {
        item = this.newGroupValidityList.filter(res => {
          return res.value === validity.value;
        });
      }
      if (item.length > 0) { itemName = item[0].label };

      if (validity.value) {
        this.orderSimulation.ValidationTests.splice(this.orderSimulation.Tests.length, 0, {
          OrderId: 0, TestId: validity.value, ProcessingLabId: 0, StatusId: 0,
          IsGroupTest: validity.status === 2 ? true : false, TestingType: 0, ItemName: itemName,
        })
      }
      //  this.orderDetail.ValidationTests.splice(this.orderDetail.ValidationTests.length, 0, validity.value);
      // }
    })

    if (this.patientInsurance.length === 1) {
      this.orderSimulation.PatientInsuranceId = this.patientInsurance[0].value;
    }
    let patientName = this.patients.filter((item) => { return item.value === this.orderSimulation.PatientId });
    if (patientName.length > 0) {
      this.orderSimulation.PatientName = patientName[0].label;
    }
    let InsuranceCompanyName =
      this.patientInsurance.filter((item) => { return item.value === this.orderSimulation.PatientInsuranceId });
    if (InsuranceCompanyName.length > 0) {
      this.orderSimulation.InsuranceCompanyName = InsuranceCompanyName[0].label;
    }

    if (!this.orderSimulation.LabId) {
      this.isLabEmpty = true;

    }
    if (!this.orderSimulation.PracticeId) {
      this.isPracticeEmpty = true;

    }
    if (!this.orderSimulation.PatientId) {
      this.isPatientEmpty = true;

    }

    if (!this.orderSimulation.GroupTestId && this.orderSimulation.GroupTestId !== 0) {
      this.isGroupTestEmpty = true;
    }

    if (!this.isGroupTestEmpty && (this.tests.length === 0 && this.validities.length === 0)) {
      this.isTestScreenEmpty = true;
    }

    let noSelectCompoundprofile = this.tests.filter(res => {
      return res.value === null;
    })
    let noOfNoSelectedValue = this.validities.filter(res => {
      return res.value == null;
    })
    if (noSelectCompoundprofile.length > 0) {
      this.errorMessage.splice(this.errorMessage.length - 1, 0,
        { severity: 'error', detail: 'Please Select Test' });
    }
    if (noOfNoSelectedValue.length > 0) {
      this.errorMessage.splice(this.errorMessage.length - 1, 0,
        { severity: 'error', detail: 'Please Select Test' });
    }

    if (!this.isLabEmpty && !this.isPracticeEmpty && !this.isPatientEmpty && !this.isGroupTestEmpty
      && !this.isTestScreenEmpty && noSelectCompoundprofile.length === 0
      && noOfNoSelectedValue.length === 0) {
      this.orderService.saveSimulationOrder(this.orderSimulation).then(res => {
        this.simulationStep = res.data;
        this.isSimulateSave = true;
      });
    }
  }

  private cancel() {
    this.routeService.openRoute('order');
  }
}



