
import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupTest, GroupTestItems, TestItem, GroupTestService } from '../shared';
import { BreadcrumbsService } from '../../../../core/shared/services';
import { DataTable, ConfirmationService, Message } from 'primeng/primeng';
import { Paginator } from '../../../../core/paginator/paginator';
import { RouteService, PaginationService } from '../../../../shared';
import { PaginationEnum } from '../../../shared/enums';
import { LabService, LabModel } from '../../../lab';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-test-edit',
  templateUrl: './group-test-edit.component.html',
})

export class GroupTestEditComponent implements OnInit {

  public groupTest: GroupTest = new GroupTest();
  public testItems: Array<any> = new Array<any>();
  public searchLab: string = '';
  public showDialog: boolean = false;
  errorMessages: Message[] = [];

  constructor(private groupTestService: GroupTestService,
    public breadcrumbsService: BreadcrumbsService,
    public routeService: RouteService,
    public labService: LabService,
    public confirmationService: ConfirmationService,
    public paginationService: PaginationService,
    public route: ActivatedRoute) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.getDefaultParams();
  }

  getDefaultParams() {
    this.groupTest.Id = this.route.snapshot.params['id'] === undefined ? 0 : Number(this.route.snapshot.params['id']);
    if (this.groupTest.Id > 0) {
      this.getGroupTestbyId();
    } else {
      this.breadcrumbsService.breadcrumbs = 'Group Test / New';
    }
  }

  selectedTests() {
    this.testItems.forEach(test => {
      let obj: GroupTestItems = {
        Id: 0,
        GroupTestId: this.groupTest.Id,
        ItemName: test.ItemName,
        TestingMenuId: test.Id,
        ClassName: test.ClassName
      }
      let exist = 0;
      this.groupTest.GroupTestItems.forEach(item => {
        if (item.TestingMenuId === test.Id && test.checked) {
          exist++;
        }
      })
      if (exist === 0 && test.checked) {
        this.groupTest.GroupTestItems = [...this.groupTest.GroupTestItems, obj];
      }
    })
    this.showDialog = false;
  }

  getGroupTestbyId() {
    this.groupTestService.getGroupTestById(this.groupTest.Id).then(result => {
      this.groupTest = result.data;
      this.breadcrumbsService.breadcrumbs = this.groupTest.GroupTestName + ' / Edit';
    });
  }

  searchLabQuery() {
    this.groupTestService.getTestByQuery(this.searchLab).then(result => {
      this.testItems = result.data;
      this.showDialog = true;
    });
  }

  deleteSelectedGroupTest(GroupTestItem) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to delete this Test Class?" + GroupTestItem.ClassName,
      accept: () => {
        let index = this.groupTest.GroupTestItems.findIndex(i => i.TestingMenuId === GroupTestItem.TestingMenuId);
        this.groupTest.GroupTestItems.splice(index, 1);
        let arr = this.groupTest.GroupTestItems;
        this.groupTest.GroupTestItems = [];
        arr.forEach(element => {
          this.groupTest.GroupTestItems = [...this.groupTest.GroupTestItems, element];
        });
      },
      reject: () => {
      }
    });

  }

  save() {
    this.groupTestService.saveGroupTest(this.groupTest).then(result => {
      this.cancel();
    });
  }

  cancel() {
    this.routeService.openRoute('testingMenu/groupTest');
  }
}
