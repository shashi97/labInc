import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SalesOfficeModel, UserService } from '../shared/index';
import { LocalStorageService } from '../../../core/shared/services/index';

@Component({
  selector: 'search-sales-office',
  templateUrl: './search-sales-office.component.html',
  styleUrls: ['./search-sales-office.component.scss']
})
export class SearchSalesOfficeComponent implements OnInit {
  // @Input() selectedLabData;
  @Output() onSelectedSalesOffice: EventEmitter<any> = new EventEmitter();
  display: boolean = false;
  searchLab: string = '';
  private seletedLabName: string = '';
  selectedLab;
  public salesOffices: Array<SalesOfficeModel> = [];
  public totalRecords: number = 0;

  constructor(private userService: UserService,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.searchLab = '';

  }

  searchLabByName() {
    this.display = true;
    this.getSalesOffice()
  }

  getSalesOffice() {
    let user = this.localStorageService.getUserDetail();
    this.userService.getSalesOffices(this.searchLab, user.UserTypeId).then(result => {
      this.salesOffices = result.data;

    })
  }

  onLabSelect(salesOffice) {
    this.searchLab = salesOffice.SalesOfficeName;
    this.onSelectedSalesOffice.emit(salesOffice);
    this.display = false;
  }
}
