import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { InsuranceCompanyModel, InsuranceCompanyService } from '../shared';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-insurance-company-view',
  templateUrl: './insurance-company-view.component.html',
  styleUrls: ['./insurance-company-view.component.css']
})

export class InsuranceCompanyViewComponent implements OnInit {

  public errorMsg: Message[] = [];
  public insurance: InsuranceCompanyModel = new InsuranceCompanyModel();

  constructor(public breadcrumbsService: BreadcrumbsService,
    private insuranceCompanyService: InsuranceCompanyService,
    private routeService: RouteService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.getDefaultParams();
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Add Insurance';
    this.insurance.Id = this.route.snapshot.params['id'];
    if (this.insurance.Id) {
      this.breadcrumbsService.breadcrumbs = 'Edit Insurance';
      this.getInsuranceById(this.insurance.Id);
    } else {
      this.getInsuranceById(0);
    }
  }

  private getInsuranceById(roleId) {
    this.insuranceCompanyService.getInsuranceById(roleId).then((result) => {
      this.insurance = result.data;
    });
  }

  public cancel(): void {
    this.routeService.openRoute('insurance');
  }
}
