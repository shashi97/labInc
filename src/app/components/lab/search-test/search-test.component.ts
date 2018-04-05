import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TestSearchModel } from './shared/shearc-test.model'

@Component({
  selector: 'search-test',
  templateUrl: './search-test.component.html',
})
export class SearchTestComponent implements OnInit {
  public searchstr: string = '';
  @Output() onTestChange = new EventEmitter();
  @Input() tests: Array<TestSearchModel> = [];
  @Input() testdetails: Array<TestSearchModel> = [];
  constructor() {

  }
  ngOnInit() {

  }

  onTestSelect() {
    let selectedtest = this.tests.filter((test) => {
      if (test.IsSelected === true) {
        return test
      }
    })
    this.onTestChange.emit(selectedtest)
  }

}
