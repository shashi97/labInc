import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InsuranceCompanySearchModel } from './shared/insurance-search.model'

@Component({
  selector: 'insurance-company-search',
  templateUrl: './insurance-company-search.component.html',
})
export class SearchInsuranceComapnyComponent implements OnInit {
  @Output() onInsuranceComapnySelect = new EventEmitter();
  @Input() insuranceCompanies: Array<InsuranceCompanySearchModel> = [];
  constructor() {

  }
  ngOnInit() {

  }

  onCompanySelect() {
    let selectedtest = this.insuranceCompanies.filter((test) => {
      if (test.IsSelected === true) {
        return test
      }
    })
    this.onInsuranceComapnySelect.emit(selectedtest)
  }

}
