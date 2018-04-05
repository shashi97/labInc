import { Component, OnInit, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { LabModel, LabService } from '../../components/lab/shared/index';
import { RouteService, PaginationService } from '../../shared';
@Component({
  selector: 'search-lab',
  templateUrl: './search-lab.component.html',
  styleUrls: ['./search-lab.component.scss']
})
export class SearchLabComponent implements OnInit, OnChanges {
  @Input() searchString;
  @Output() onSelectedLab: EventEmitter<any> = new EventEmitter();
  errorMsg: any;
  display: boolean = false;
  searchLab: string = '';
  pageSize: any;
  private seletedLabName: string = '';
  selectedLab;
  public labs: Array<LabModel> = [];
  public totalRecords: number = 0;
  constructor(private labService: LabService,
    public paginationService: PaginationService) {
    this.paginationService.setDefaultPage();
  }

  ngOnInit() {
    this.searchLab = this.searchString;
  }
  ngOnChanges() {
    this.searchLab = this.searchString;
  }

  searchLabByName() {
    this.display = true;
    this.getLabs()
  }

  getLabs() {
    this.labService.getLabsByName(this.searchLab).then(result => {
      this.labs = result.data;
      // this.totalRecords = result.data.TotalRecords;
    })
  }

  onLabSelect(lab) {
    this.searchLab = lab.Name;
    this.onSelectedLab.emit(lab);
    this.display = false;
  }
}
