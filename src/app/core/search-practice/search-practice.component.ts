import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PracticeModel, PracticeService } from '../../components/practice/shared/index';
import { RouteService, PaginationService } from '../../shared';
import { Message } from 'primeng/primeng';
@Component({
  selector: 'search-practice',
  templateUrl: './search-practice.component.html',
  styleUrls: ['./search-practice.component.scss']
})
export class SearchPracticeComponent implements OnInit {

  @Output() onSelectedLab: EventEmitter<any> = new EventEmitter();
  @Output() onPracticeSelect: EventEmitter<any> = new EventEmitter();
  display: boolean = false;
  @Input() labId: any;
  searchLab: string = '';
  private seletedLabName: string = '';
  selectedLab;
  public errorMsg: Message[] = [];
  public practice: Array<PracticeModel> = [];
  public totalRecords: number = 0;
  constructor(private practiceService: PracticeService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
    if (this.labId && this.labId !== 0) {
      this.getPractices()
    }
  }

  ngOnInit() {
    this.searchLab = '';
  }


  searchLabByName() {
  
    this.getPractices()
  }

  getPractices() {
    if (this.labId > 0) {
      this.practiceService.getPracticesByLabId(this.labId, this.searchLab).then(result => {
        this.practice = result.data;
        this.display = true;
        // this.totalRecords = result.data.TotalRecords;
      })
    } else {
      this.errorMsg.push({
        severity: 'error',
        summary: 'Error Message', detail: 'Please Search and Select Lab First.'
      });
      this.display = false;

    }
  }

  onPracticeSelected(practice) {
    this.searchLab = practice.Name;
    this.onPracticeSelect.emit(practice);
    this.display = false;
  }

}
