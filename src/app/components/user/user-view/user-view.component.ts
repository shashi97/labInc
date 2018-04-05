import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from './../../../core/shared/services';
import { RouteService } from './../../../shared';
import { UserModel, UserService } from '../shared/index';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})

export class UserViewComponent implements OnInit {

  public errorMsg: Message[] = [];
  public user: UserModel = new UserModel();

  constructor(public breadcrumbsService: BreadcrumbsService,
    private userService: UserService,
    private routeService: RouteService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.getDefaultParams();
  }

  getDefaultParams() {
    this.breadcrumbsService.breadcrumbs = 'Add User';
    this.user.Id = this.route.snapshot.params['id'] || 0;
    if (this.user.Id >0) {
      this.breadcrumbsService.breadcrumbs = 'Edit User';
      this.getUserById(this.user.Id);
    } 
  }

  private getUserById(userId) {
    this.userService.getUserById(userId).then((result) => {
      this.user = result.data;
    });
  }

  editUser() {
    this.routeService.openRoute('user/' + this.user.Id + '/edit');
  }

  public save() {
    this.userService.saveUser(this.user).then((res) => {
      this.errorMsg.push({
        severity: 'success',
        summary: 'Success Message', detail: 'Save Successfully'
      });
      this.routeService.openRoute('user');
    });
  }

  public cancel(): void {
    this.routeService.openRoute('user');
  }
}
