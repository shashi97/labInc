import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TestService } from '../shared/test.service.component';
import { TestSearchModel } from '../search-test/shared/shearc-test.model';
import { TestModel } from './shared/test.model'
import { Message, ConfirmationService, DataTable } from 'primeng/primeng';
import { BreadcrumbsService } from '../../../core/shared/services';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
})
export class TestComponent implements OnInit {
  public searchStr: string = '';
  public showModal: boolean = false;
  public tests: Array<TestSearchModel> = [];
  public labTest: Array<TestModel> = [];
  private selectedTestData: Array<TestSearchModel> = [];
  private testModel: TestModel = new TestModel();
  public messages: Array<Message> = []

  constructor(private testService: TestService,
    public breadcrumbsService: BreadcrumbsService,
    private confirmationService: ConfirmationService) {

  }
  ngOnInit() {
    this.breadcrumbsService.breadcrumbs = 'Lab/Tests';
    this.getLabTest();
  }

  onTestSearch() {
    this.testService.getTests(this.searchStr).then((response) => {
      this.tests = response.data;
      if (this.tests.length > 0) {
        this.showModal = true;
      }
    });
  }

  getLabTest() {
    this.testService.getLabTests().then((response) => {
      this.labTest = response.data;
    })
  }

  onTestChange(data) {
    this.selectedTestData = data;
  }

  cancel() {
    this.showModal = false;
    this.searchStr = '';
  }

  saveSearchedTests() {
    this.labTest.forEach((labtest) => {
      this.selectedTestData.forEach((selectedlab) => {
        if (labtest.CptCode === selectedlab.Code) {
          let index = this.selectedTestData.indexOf(selectedlab);
          this.selectedTestData.splice(index, 1);
        }
      })
    })
    this.selectedTestData.forEach((test) => {
      this.testModel = new TestModel();
      this.testModel.CptCode = test.Code;
      this.testModel.CptCodeId = test.Id;
      this.testModel.GeneName = test.GeneName;
      this.testModel.InNetworkFee = test.InNetworkFee;
      this.testModel.DefaultProcessingFee = 0;
      this.testModel.Id = 0;
      this.testModel.DefaultReferredLabCommission = 0;
      this.testModel.LabId = 0;
      this.labTest = [...this.labTest, this.testModel]
    });
    this.showModal = false;
  }

  saveLabTests() {
    this.testService.saveLabTests(this.labTest).then((response) => {
      this.getLabTest();
    })
  }

  deletelabTest(test) {
    let index = this.labTest.indexOf(test);
    if (test.Id > 0) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete - ' + test.CptCode + ' ?',
        icon: 'fa fa-trash',
        accept: () => {
          this.testService.deleteLabTestById(test.Id).then((response) => {
            if (response) {
              this.messages.push({ severity: 'success', summary: '', detail: 'Record deleted but not save plese save' });
              this.getLabTest();
            }
          })
        }
      });
    } else {
      this.labTest.splice(index, 1);
      this.labTest = [...this.labTest]
    }
  }
}


