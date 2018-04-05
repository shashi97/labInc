import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { PracticeModel, PracticeService } from '../shared/index';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-practice-view',
  templateUrl: './practice-view.component.html',
  styleUrls: ['./practice-view.component.css']
})

export class PracticeViewComponent implements OnInit {

  public errorMessage: Message[] = [];
  public practice: PracticeModel = new PracticeModel();

  constructor(public breadcrumbsService: BreadcrumbsService,
    private practiceService: PracticeService,
    private routeService: RouteService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.getDefaultParams();
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Add Practice';
    this.practice.Id = this.route.snapshot.params['id'];
    if (this.practice.Id) {
      this.breadcrumbsService.breadcrumbs = 'Edit Practice';
      this.getPracticeById(this.practice.Id);
    } else {
      this.getPracticeById(0);
    }
  }

  private getPracticeById(practiceId) {
    this.practiceService.getPracticeById(practiceId).then((result) => {
      this.practice = result.data;
    });
  }

  editPractice() {
    this.routeService.openRoute('practice/' + this.practice.Id + '/edit');
  }
  deletePractice() {
    this.routeService.openRoute('practice/' + this.practice.Id + '/edit');
  }

  public save() {
    this.practiceService.savePractice(this.practice).then((res) => {
      this.errorMessage.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.routeService.openRoute('practice');
    });
  }

  public cancel(): void {
    this.routeService.openRoute('practice');
  }
}
