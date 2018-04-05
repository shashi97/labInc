import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';

import { OrderModel, OrderTest, TestModel, OrderEligibilityCheck } from '../shared/order.model';
import { PatientModel, PatientService, PatientGuarantorInfo } from '../../patient/shared';

import { InsuranceModel } from '../../patient/insurance/shared/insurance.model';

import { ICDCodesModel } from '../../codes/icdCodes/shared/icdCodes.model';
import { EmailValidateService } from '../../shared/services/email-validate.component'
import { OrderService } from '../shared';
import { InsuranceService } from '../../patient/insurance/shared/insurance.service';
import { LoaderService } from '../../../core/loader/loader.service';
import { PatientEligibilityCriteriaService } from '../../patient-eligibility-criteria/shared/patient-eligibility-criteria.service';
// import { InsuranceModel, insuranceService, insurancePermission } from '../shared';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-order-edit',
  templateUrl: './Order-edit.component.html',
  styleUrls: ['./Order-edit.component.css']
})

export class OrderEditComponent implements OnInit {

  public patient: PatientModel = new PatientModel();
  public insurance: InsuranceModel = new InsuranceModel();
  public insuranceDetail: InsuranceModel = new InsuranceModel();
  public pageIndex;
  public errorMsg: Message[] = [];
  public id: number;
  public isUpdate: boolean = false;
  public patientId: number;
  public isSubmit: boolean = false;
  public isSelectedCompoundProfile: boolean = false;
  public isStatusZero: boolean = false;
  public isPatientValidate = false;
  public isInsuranceType = false;
  public isInsuranceSelected = false;
  public orderDetail: OrderModel = new OrderModel();
  public ICDCodes: Array<any> = [];
  public prescribeMedicine: Array<any> = [];
  public physician: Array<any> = [{ label: 'None', value: 0 }];
  public groupTests: Array<any> = [{ label: 'Add Individual Panel', value: 0 }];
  public insuranceType: Array<any> = [];
  public groupTestsList: Array<any> = [];
  public tests: Array<any> = [];
  public validities: Array<any> = [];
  public groupValidityList: Array<any> = [];
  public newGroupValidityList: Array<any> = [];
  public newGroupTestList: Array<any> = [];
  public labs: Array<any> = [];
  public patients: Array<any> = [];
  public scientists: Array<any> = [];
  public errorMessage: Array<any> = [];
  public caseTypes: Array<any> = [];
  public patientInsurance: Array<any> = [];
  public isClickAddPatient: boolean = false;
  public isPatientErr: boolean = false;
  public tempValidity: Array<any> = [];
  public tempTest: Array<any> = [];
  public isEmptyMedicalRecordNo: boolean = false;
  public isPrimaryPhysicianEmpty: boolean = false;
  public isEmptyGroupTest: boolean = false;
  public isCaseTypeEmpty: boolean = false;
  public isVolumnEmpty: boolean = false;
  public currentYear: number;
  public review: boolean = false;
  public eligibility: any;
  private isTestScreenEmpty: boolean = false;
  private isValidityTestEmpty: boolean = false;
  private isShowInsurance: boolean = false;
  private isClickNewInsurance: boolean = false;
  private isInsuranceShow: boolean = false;
  private insuranceNameObj;
  private isReviewer: boolean = false;
  private isSubmitOrder: boolean = false;
  private isCheckEligible: boolean = false;
  private isEligibleTest: boolean = false;
  private checkEligibilities: Array<any> = [];
  private nextButtonLabel: string = 'Next';
  private showFailingReasonDisplay: boolean = false;
  private reasonStatus: boolean = false;
  private failingReasonComment: Array<any> = [];
  private RiskGroupDDOs: Array<any> = [];
  private PatientConditionDDOs: Array<any> = [];
  private checkFailCriteras: Array<any> = [];
  constructor(public breadcrumbsService: BreadcrumbsService,
    private routeService: RouteService,
    public route: ActivatedRoute,
    public orderService: OrderService,
    public patientService: PatientService,
    public emailValidateService: EmailValidateService,
    public insuranceService: InsuranceService,
    public loaderService: LoaderService,
    private confirmationService: ConfirmationService,
    private patientEligibilityCriteriaService: PatientEligibilityCriteriaService
  ) {
    this.getIcdCode();
    this.getRiskGroupDDOs();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.patientId = Number(this.route.snapshot.params['patientId']);
    this.pageIndex = 0;
    var year = new Date();
    this.currentYear = year.getFullYear() + 10;
    this.checkEligibilities = [{ EligibilityCheckName: "Patient Eligibility" },
    { EligibilityCheckName: "Insurance Specific CPT/ICD Combination" }]
  }

  getDefault() {
    if (this.id) {
      this.breadcrumbsService.breadcrumbs = 'Edit Order';
      this.orderDetail.Id = this.id;
      this.isUpdate = true;
      this.getOrderDetails(this.orderDetail.Id);


    } else {
      this.isUpdate = false;
      this.breadcrumbsService.breadcrumbs = 'Add Order';
      this.getPatientConditionDDOs();
    }
  }

  public getOrderDetails(id) {
    this.isSelectedCompoundProfile = false;
    this.orderService.getOrderDetail(Number(id)).then(res => {
      this.orderDetail = res.data;
      this.orderDetail.GroupTestId = res.data.GroupTestId ? res.data.GroupTestId : 0;
      this.orderDetail.SecondaryPhysicianId = res.data.SecondaryPhysicianId ? res.data.SecondaryPhysicianId : 0;
      this.orderDetail.PrimaryPhysicianId = res.data.PrimaryPhysicianId ? res.data.PrimaryPhysicianId : 0;
      this.orderDetail.DateCollected = res.data.DateCollected ? new Date(res.data.DateCollected) : '';
      this.orderDetail.DateReceived = res.data.DateReceived ? new Date(res.data.DateReceived) : '';
      this.onSelectPatient();
      this.onSelectIcdCode();
      this.getInsuranceInfo(this.orderDetail.PatientInsuranceId);

      this.onSelectGroup().then(response => {
        if (response) {
          if (this.orderDetail.Tests.length > 0) {
            this.orderDetail.Tests.map(test => {
              if (this.newGroupTestList.length > 0) {
                this.newGroupTestList.map(grouptest => {
                  if (test.TestId === grouptest.value && !test.IsGroupTest) {
                    this.tests.splice(this.tests.length, -1, { value: test.TestId, status: 1, CPTCode: grouptest.CPTCode });
                    this.tempTest.splice(this.tempTest.length, -1, { value: test.TestId, status: 1, CPTCode: grouptest.CPTCode })
                  }
                });
              }
            });
          }
          if (this.orderDetail.ValidationTests.length > 0) {
            this.orderDetail.ValidationTests.map(validity => {
              if (this.newGroupValidityList.length > 0) {
                this.newGroupValidityList.map(grouptest => {
                  if (validity.TestId === grouptest.value && !validity.IsGroupTest) {
                    this.validities.splice(this.tests.length, -1, { value: validity.TestId, status: 1, CPTCode: grouptest.CPTCode });
                    this.tempValidity.splice(this.tempValidity.length, -1, {
                      value: validity.TestId, status: 1,
                      CPTCode: grouptest.CPTCode
                    })
                  }
                });
              }
            });
          }
        }
      });
    })
  }

  showFailingReason(elegibilityReason, status) {
    this.showFailingReasonDisplay = true;
    if (status === 'pass') {

      this.failingReasonComment = JSON.parse(elegibilityReason.FailingReason).data.service_types;
    }
    if (status === 'fail') {
      this.failingReasonComment = elegibilityReason.FailingReason;
    }
    this.reasonStatus = status;
  }
  Close() {
    this.showFailingReasonDisplay = false;
  }

  public getIcdCode(): void {
    this.orderService.getIcdCode().then(res => {
      if (res.data.length > 0) {
        res.data.map(icd => {
          this.ICDCodes.splice(this.ICDCodes.length, -1, { label: icd.Code, value: icd.Id });
        })
      }
      this.getPrescribedMedicine();
      // this.ICDCodes = res.data;
    })
  }

  public getPrescribedMedicine(): void {
    this.orderService.getPrescribedMedicine().then(medicine => {
      if (medicine.data.length > 0) {
        medicine.data.map(res => {
          this.prescribeMedicine.splice(this.prescribeMedicine.length, -1, { label: res.DrugName, value: res.Id })
        })
      }
    })
    this.getPhysician();
  }

  getPatientConditionDDOs() {
    this.patientEligibilityCriteriaService.getPatientConditionDDOs().then(result => {
      this.PatientConditionDDOs = result.data;
      this.PatientConditionDDOs.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    });
  }

  getRiskGroupDDOs() {
    this.patientEligibilityCriteriaService.getRiskGroupDDOs().then(result => {
      this.RiskGroupDDOs = result.data;
      this.RiskGroupDDOs.map((item) => {
        item.label = item.RiskGroupName;
        item.value = item.Id;
      })
    });
  }

  public getPhysician(): void {
    this.orderService.getPhysician().then(phy => {
      if (phy.data.length > 0) {
        phy.data.map(res => {
          this.physician.splice(this.physician.length, -1, { label: res.Name, value: res.Id });
        })
      }
    })
    this.getGroupTest();
  }

  public getAllByLabId(): void {
    this.orderService.getAllByLabId().then(lab => {
      if (lab.data.length > 0) {
        lab.data.map(res => {
          this.labs.splice(this.physician.length, -1, { label: res.GeneName, value: res.Id });
        })
      }
    })

  }

  public getScientistList(): void {
    this.orderService.getScientistList().then(res => {
      if (res.data.length > 0) {
        res.data.map(scientist => {
          this.scientists.splice(this.physician.length, -1, { label: scientist.Name, value: scientist.Id });
        })
      }
    })
  }

  public getCaseTypeList(): void {
    this.caseTypes = [];
    this.orderService.getCaseTypeList().then(res => {
      if (res.data.length > 0) {
        res.data.map(caseType => {
          this.caseTypes.splice(this.physician.length, -1, { label: caseType.Name, value: caseType.Id });
        })
      }
      this.getDefault();
    })
  }

  public getGroupTest(): void {
    this.orderService.getGroupTest().then(res => {
      if (res.data.length > 0) {
        res.data.map(order => {
          this.groupTests.splice(this.physician.length, -1, { label: order.GroupTestName, value: order.Id });
        })
      }
      this.getInsuranceType();

    });
  }

  public getInsuranceType(): void {
    this.orderService.getInsuranceType().then(res => {
      this.insuranceType = res.data;
      this.orderDetail.InsuranceTypeId = this.insuranceType[0].Id;
      this.getPatientList();
    });
  }

  public getPatientList() {
    let promise = new Promise((resolve, reject) => {
      this.orderService.getPatientList().then(res => {
        // this.patients = res.data;
        if (res.data.length > 0) {
          res.data.map(patient => {
            this.patients.splice(this.physician.length, -1, { label: patient.FirstName + ' ' + patient.LastName, value: patient.Id });
          })
          if (this.patientId) {
            this.orderDetail.PatientId = this.patientId;
            this.onSelectPatient();
          }

        }

        this.getCaseTypeList();
        resolve(true);
      });
    });
    return promise;
  }

  private onSelectIcdCode(): void {
    this.PatientConditionDDOs = [];
    this.patientEligibilityCriteriaService.getPatientConditionListBasedOnId(this.orderDetail.ICDCodes).then(res => {
      this.PatientConditionDDOs = res.data;
      this.PatientConditionDDOs.map((item) => {
        item.label = item.Name;
        item.value = item.Id;
      })
    })
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
      this.orderService.GetGroupTesteById(this.orderDetail.GroupTestId).then(res => {
        this.isSelectedCompoundProfile = true;
        res.data.map((res1, index) => {
          if (Number(res1.Status) === 2 && res1.TestingType === 1) {
            this.groupTestsList.splice(this.groupTestsList.length, -1, { label: res1.ItemName, value: res1.Id, CPTCode: res1.CPTCode });
            this.tests.splice(this.tests.length, -1, {
              value: this.groupTestsList[this.groupTestsList.length - 1].value,
              status: 2, CPTCode: res1.CPTCode

            });
          }
          if (Number(res1.Status) === 1 && res1.TestingType === 1) {
            this.newGroupTestList.splice(this.newGroupTestList.length, -1, {
              label: res1.ItemName, value: res1.Id, allreadyAdd: false,
              CPTCode: res1.CPTCode
            });
          }
          if (Number(res1.Status) === 2 && res1.TestingType === 2) {
            this.groupValidityList.splice(this.groupValidityList.length, -1, {
              label: res1.ItemName, value: res1.Id,
              CPTCode: res1.CPTCode
            });
            this.validities.splice(this.validities.length, -1,
              { value: this.groupValidityList[this.groupValidityList.length - 1].value, status: 2, CPTCode: res1.CPTCode });
          }
          if (Number(res1.Status) === 1 && res1.TestingType === 2) {
            this.newGroupValidityList.splice(this.newGroupValidityList.length, -1, {
              label: res1.ItemName, value: res1.Id, CPTCode: res1.CPTCode,
              allreadyAdd: false
            });
          }
        })
        resolve(true);
      });
    });
    return promise;

  }


  private onSelectTestOrder(physicianId, index): void {
    let filterPhysician = [];


    if (physicianId.value) {


      filterPhysician = this.tests.filter((compound, index1) => {
        return compound.value === physicianId.value && index1 !== index
      })
    }
    if (filterPhysician.length > 0) {
      this.errorMessage.splice(this.errorMessage.length - 1, 0,
        { severity: 'error', detail: 'Selected Test Already Exist' });
      this.tests[index].value = null;
    }
    if (filterPhysician.length === 0 && physicianId.value) {
      let cptIndex = this.newGroupTestList.filter(res => {
        return res.value === physicianId.value;
      })
      if (cptIndex.length > 0) {
        physicianId.CPTCode = cptIndex[0].CPTCode;
      }


      let filterTest = this.tests.filter(res => {
        return res.status === 1;
      })
      if (filterTest.length > this.tempTest.length || this.tempTest.length === 0) {
        this.tempTest.splice(this.tempTest.length, -1, { value: physicianId.value, status: 1, CPTCode: physicianId.CPTCode });
      }
    }


  }

  private onSelectValidityOrder(physicianId, index): void {
    let filterPhysician = [];
    if (physicianId) {


      filterPhysician = this.validities.filter((compound, index1) => {
        return compound.value === physicianId.value && index1 !== index
      })
    }
    if (filterPhysician.length > 0) {
      this.errorMessage.splice(this.errorMessage.length - 1, 0,
        { severity: 'error', detail: 'Selected validity Already Exist' });
      this.validities[index].value = null;
    }

    if (filterPhysician.length === 0 && physicianId.value) {

      let cptIndex = this.newGroupValidityList.filter(res => {
        return res.value === physicianId.value;
      })
      if (cptIndex.length > 0) {
        physicianId.CPTCode = cptIndex[0].CPTCode;
      }

      let filterTest = this.validities.filter(res => {
        return res.status === 1;
      })
      if (filterTest.length > this.tempValidity.length || this.tempValidity.length === 0) {
        this.tempValidity.splice(this.tempValidity.length, -1, { value: physicianId, status: 1 });
      }
    }
  }


  public addPatient(): void {
    this.routeService.openRoute('patient/order/add');
  }

  public onSelectPatient(): void {
    this.isShowInsurance = false;
    this.isInsuranceShow = false;
    this.orderService.getInsuranceByPatientId(
      this.orderDetail.PatientId, this.orderDetail.InsuranceTypeId).then(res => {
        // this.patientInsurance = res.data;
        // to show add insurance
        this.isShowInsurance = true;
        this.patientInsurance = [];
        res.data.map(insurance => {
          this.patientInsurance.splice(this.patientInsurance.length, 0, {
            label: insurance.InsuranceCompanyName
            + ' (' + insurance.PolicyId + ')', value: insurance.Id
          })
        });


        if (this.patientInsurance.length === 1) {
          this.getInsuranceInfo(this.patientInsurance[0].value);
        }

      })

    // if (this.orderDetail.Id === 0) {
    this.getPatientById(this.orderDetail.PatientId);
    // }

  }

  private getInsuranceInfo(insuranceId) {

    this.insuranceService.getInsuranceById(insuranceId).then(result => {
      this.insuranceDetail = result.data;
      this.isInsuranceShow = true;
    })
  }

  private getPatientById(roleId) {
    this.patient = new PatientModel();
    this.patientService.getPatientById(roleId).then((result) => {
      this.patient = result.data;
      this.breadcrumbsService.breadcrumbs = this.patient.FirstName + ' ' + this.patient.LastName + ' / Edit';
      this.patient.DateOfBirth = this.patient.DateOfBirth ? new Date(this.patient.DateOfBirth) : '';
      if (this.patient.PatientGuarantorInfoData === null) {
        this.patient.PatientGuarantorInfoData = new PatientGuarantorInfo();
      }
      if (this.patient.PatientGuarantorInfoData.DateOfBirth) {
        this.patient.PatientGuarantorInfoData.DateOfBirth = new Date(this.patient.PatientGuarantorInfoData.DateOfBirth);
      }
    });
  }

  public validateOrder(isDraft, isReview) {
    this.isPatientErr = true;
    this.orderDetail.Tests = [];
    this.orderDetail.ValidationTests = [];
    this.orderDetail.IsDraft = isDraft;
    this.orderDetail.IsInReview = isReview;
    this.isCheckEligible = true;
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
        this.orderDetail.Tests.splice(this.orderDetail.Tests.length, 0, {
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
        this.orderDetail.ValidationTests.splice(this.orderDetail.Tests.length, 0, {
          OrderId: 0, TestId: validity.value, ProcessingLabId: 0, StatusId: 0,
          IsGroupTest: validity.status === 2 ? true : false, TestingType: 0, ItemName: itemName,
        })
      }
      //  this.orderDetail.ValidationTests.splice(this.orderDetail.ValidationTests.length, 0, validity.value);
      // }
    })

    if (this.patientInsurance.length === 1) {
      this.orderDetail.PatientInsuranceId = this.patientInsurance[0].value;
    }
    let patientName = this.patients.filter((item) => { return item.value === this.orderDetail.PatientId });
    if (patientName.length > 0) {
      this.orderDetail.PatientName = patientName[0].label;
    }
    let PrimaryPhysicianName =
      this.physician.filter((item) => { return item.value === this.orderDetail.PrimaryPhysicianId });
    if (PrimaryPhysicianName.length > 0) {
      this.orderDetail.PrimaryPhysicianName = PrimaryPhysicianName[0].label;
    }
    let InsuranceCompanyName =
      this.patientInsurance.filter((item) => { return item.value === this.orderDetail.PatientInsuranceId });
    if (InsuranceCompanyName.length > 0) {
      this.orderDetail.InsuranceCompanyName = InsuranceCompanyName[0].label;
    }
  }

  public saveDraft(isDraft, isReview) {

    this.validateOrder(isDraft, isReview);

    this.saveOrder(isReview);
  }

  public checkElegibility(isDraft, isReview) {
    this.checkFailCriteras = [];
    this.validateOrder(isDraft, isReview);
    this.orderService.checkEligibility(this.orderDetail).then(res => {
      this.isEligibleTest = true;
      this.checkEligibilities = res.data;
      this.orderDetail.OrderEligibilities = this.checkEligibilities;
      this.checkFailCriteras = this.checkEligibilities.filter(element => {
        return element.IsFailed === true;
      })
      if (this.checkFailCriteras.length === 0) {
        // this.saveOrder(isReview);
        this.isSubmitOrder = true;
      } else {
        this.isReviewer = true;
      }
    });
  }


  public saveOrder(isReview) {
    this.orderDetail.IsInReview = isReview;
    this.orderService.saveOrder(this.orderDetail).then(res => {
      this.isPatientErr = false;
      this.isReviewer = false;
      this.orderDetail.OrderNo = res.data.OrderNo;
      // this.orderDetail.Id = res.data.Id;
      this.isSubmit = true;
      if (res.data.IsDraft) {
        this.routeService.openRoute('order');
      }
    });
  }


  public backToOrder() {
    this.routeService.openRoute('order');
  }
  public addNewOrder() {
    this.pageIndex = 0;
    this.orderDetail = new OrderModel();
    this.groupTestsList = [];
    this.newGroupTestList = [];
    this.tests = [];
    this.newGroupValidityList = [];
    this.validities = [];
    this.groupValidityList = [];
    this.isSubmit = false;
    this.patientInsurance = [];
    this.insuranceDetail = new InsuranceModel();
    this.isInsuranceShow = false;
    this.routeService.openRoute('order/add');
  }

  public cancel() {
    this.routeService.openRoute('order');
  }

  /* next and previous page */
  public previousPage(): void {
    this.isEligibleTest = false;
    if (this.pageIndex >= 0 && this.pageIndex < 3) {
      --this.pageIndex;
    }
  }
  public nextPage() {
    if (this.pageIndex >= 0 && this.pageIndex < 3) {
      if (this.pageIndex === 1) {
        this.nextButtonLabel = 'Check Eligibility And Next Order';
        this.isEmptyMedicalRecordNo = false;
        this.isPrimaryPhysicianEmpty = false;
        this.isCaseTypeEmpty = false;
        this.isVolumnEmpty = false;
        this.isEmptyGroupTest = false;
        this.isTestScreenEmpty = false;
        // this.isEligibleTest = true;
        this.isReviewer = false;
        let noSelectCompoundprofile = this.tests.filter(res => {
          return res.value === null && res.status === 1;
        })
        let noOfNoSelectedValue = this.validities.filter(res => {
          return res.value == null && res.status === 1;
        })
        if (noSelectCompoundprofile.length > 0) {
          this.errorMessage.splice(this.errorMessage.length - 1, 0,
            { severity: 'error', detail: 'Please Select Test' });
        }
        if (noOfNoSelectedValue.length > 0) {
          this.errorMessage.splice(this.errorMessage.length - 1, 0,
            { severity: 'error', detail: 'Please Select Test' });
        }
        // if (!this.orderDetail.MedicalRecordNo) {
        //   this.isEmptyMedicalRecordNo = true;
        // }
        if (!this.orderDetail.GroupTestId && this.orderDetail.GroupTestId !== 0) {
          this.isEmptyGroupTest = true;
        }
        if (this.orderDetail.ICDCodes.length == 0) {
          this.isPrimaryPhysicianEmpty = true;
        }


        // if (!this.orderDetail.PrimaryPhysicianId && this.orderDetail.PrimaryPhysicianId !== 0) {
        //   this.isPrimaryPhysicianEmpty = true;
        // }
        if (!this.orderDetail.CaseTypeId) {
          this.isCaseTypeEmpty = true;
        }
        if (!this.isEmptyGroupTest && (this.tests.length === 0 && this.validities.length === 0)) {
          this.isTestScreenEmpty = true;
        }
        if (this.isPrimaryPhysicianEmpty
          || this.isCaseTypeEmpty
          || this.isVolumnEmpty
          || this.isEmptyGroupTest
          || noSelectCompoundprofile.length > 0
          || noOfNoSelectedValue.length > 0
          || this.isTestScreenEmpty
        ) {
          return false;
        } else {
          // this.checkElegibility();
        }

      }
      if (this.pageIndex === 0) {
        this.nextButtonLabel = 'Next';
        this.isPatientValidate = false;
        this.isInsuranceType = false;
        this.isInsuranceSelected = false;
        if (!this.orderDetail.PatientId) {
          this.isPatientValidate = true;
          // this.errorMessage.splice(this.errorMessage.length - 1, 0,
          //   { severity: 'error', detail: 'Please Select Patient' });
          return false;
        }
        if (this.patientInsurance.length === 0 && Number(this.orderDetail.InsuranceTypeId) !== 5) {
          this.isInsuranceType = true;
          // this.errorMessage.splice(this.errorMessage.length - 1, 0,
          //   { severity: 'error', detail: 'Please Select Self Pay option as a Insurance Type' });
          return false;
        }
        if (this.patientInsurance.length > 1 && !this.orderDetail.PatientInsuranceId) {
          this.isInsuranceSelected = true;
          // this.errorMessage.splice(this.errorMessage.length - 1, 0,
          //   { severity: 'error', detail: 'Please Select Insurance Type' });
          return false;
        }
      }
      ++this.pageIndex;
    }
    if (this.pageIndex === 3) {
      this.nextButtonLabel = 'Submit Order';
    }
  }

  public disablePrevious() {
    let style;

    style = {
      'pointer-events': this.pageIndex === 0 ? 'none' : 'all'
    };
    return style;
  }

  public setMargin() {
    let style;

    style = {
      'margin-top': this.patientInsurance.length > 1 ? '29%' : '0%'
    };
    return style;
  }

  public disableNext() {
    let style;

    style = {
      'pointer-events': this.pageIndex === 2 ? 'none' : 'all'
    };
    return style;
  }


  showErrorMessage(message) {
    this.errorMessage.push({
      severity: 'error',
      detail: message
    });
  }

  public savePatient() {

    this.patient.isValid = true;
    this.insurance.isValid = true;
    if (this.patient.FirstName === '' || this.patient.LastName === '' || this.patient.SSN === ''
      || this.patient.MedicalRecordNo === '' || this.patient.Gender === ''
      || this.patient.Address1 === ''
      || this.insurance.InsuranceTypeId === 0 || this.insurance.InsuranceCompanyId === 0
      || this.insurance.PolicyId === '' || this.insurance.NameOfInsured === ''
      || this.insurance.RelationId === 0
    ) {
      this.showErrorMessage('Please Fill All Required Field');
      return;
    }

    if (!this.emailValidateService.validateEmail(this.patient.Email) && this.patient.Email !== '') {
      this.errorMessage.push({
        severity: 'error',
        summary: 'Warn Message', detail: 'Email Id Not Valid.'
      });
      return;
    }
    if (!this.emailValidateService.validateEmail(this.patient.PatientGuarantorInfoData.Email)
      && this.patient.PatientGuarantorInfoData.Email !== '') {
      this.errorMessage.push({
        severity: 'error',
        summary: 'Warn Message', detail: 'Email Id Not Valid.'
      });
      return;
    }
    this.isPatientErr = false;
    this.patient.PatientInsurances = [];
    this.patient.PatientGuarantorInfoData.PatientId = this.patient.Id;
    this.patient.PatientInsurances.splice(this.patient.PatientInsurances.length, -1, this.insurance);
    this.patientService.savePatient(this.patient).then((res) => {
      this.isClickAddPatient = false;
      this.patients = [];
      this.getPatientList().then(res1 => {
        this.orderDetail.PatientId = res.data.Id;
        this.onSelectPatient();
      });
      this.patient = new PatientModel();
      this.insurance = new InsuranceModel();

    });

  }

  private savePatientInsurance(): void {
    this.insurance.isValid = true;
    if (this.insurance.InsuranceTypeId === 0 || this.insurance.InsuranceCompanyId === 0
      || this.insurance.PolicyId === '' || this.insurance.NameOfInsured === ''
      || this.insurance.RelationId === 0 || !this.insurance.ValidityOfPolicy
    ) {

      return;
    }
    this.insurance.PatientId = this.patient.Id;
    this.insuranceService.saveInsurance(this.insurance).then(res => {
      this.isClickNewInsurance = false;
      this.orderService.getInsuranceByPatientId(
        this.orderDetail.PatientId, this.orderDetail.InsuranceTypeId).then(res1 => {
          // this.patientInsurance = res.data;
          // to show add insurance
          this.isShowInsurance = true;
          this.patientInsurance = [];
          res1.data.map(insurance => {
            this.patientInsurance.splice(this.patientInsurance.length, 0, { label: insurance.InsuranceCompanyName, value: insurance.Id })
          });

          this.orderDetail.InsuranceTypeId = res.data.InsuranceTypeId;
          this.onSelectPatient();
          this.orderDetail.PatientInsuranceId = res.data.Id;
          this.getInsuranceInfo(this.orderDetail.PatientInsuranceId);
          // this.orderDetail.InsuranceTypeId = res.data.InsuranceTypeId;
          // this.insurance = new InsuranceModel();
          // this.isInsuranceShow = false;
        })
      // this.patient = new PatientModel();
      // this.insurance = new InsuranceModel();
    });
  }

  private openPatientPopup() {
    this.insuranceNameObj = {};
    this.patient = new PatientModel();
    this.isClickAddPatient = true;
  }

  private openInsurancePopup() {
    this.insuranceNameObj = {};
    this.insurance = new InsuranceModel();
    this.insurance.PatientId = this.patient.Id;
    this.isClickNewInsurance = true;
  }






}
