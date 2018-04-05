import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { LabModel, LabService } from '../shared';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-lab-view',
  templateUrl: './lab-view.component.html',
  styleUrls: ['./lab-view.component.css']
})

export class LabViewComponent implements OnInit {

  public errorMsg: Message[] = [];
  public lab: LabModel = new LabModel();

  constructor(public breadcrumbsService: BreadcrumbsService,
    private labService: LabService,
    private routeService: RouteService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.getDefaultParams();
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Add Lab';
    this.lab.Id = this.route.snapshot.params['labId'];
    if (this.lab.Id) {
      this.breadcrumbsService.breadcrumbs = 'Edit Lab';
      this.getLabById(this.lab.Id);
    } else {
      this.getLabById(0);
    }
  }

  private getLabById(labId) {
    this.labService.getLabById(labId).then((result) => {
      this.lab = result.data;
    });
  }

  editLab() {
    this.routeService.openRoute('lab/' + this.lab.Id + '/edit');
  }

  public save() {
    this.labService.saveLab(this.lab).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.routeService.openRoute('lab');
    });
  }

  public cancel(): void {
    this.routeService.openRoute('lab');
  }
}
