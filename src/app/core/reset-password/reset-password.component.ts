import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from './../../shared/route.service';
import { ResetPasswordModel } from './reset-password.model';
import { Message } from 'primeng/primeng';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html'
})

export class ResetPasswordComponent implements OnInit {

  public message: Message[] = [];
  public resetPassword = new ResetPasswordModel();
  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public routeService: RouteService,
    private authenticationService: AuthenticationService,
  ) {

  }

  ngOnInit() {
    this.checkToken();
  }

  public reset() {
    if (this.resetPassword.Password === '' || this.resetPassword.ConfirmPassword === '') {
      this.message.push({
        severity: 'error',
        summary: 'error Message', detail: 'password can not be blank'
      });
      return;
    }
    if (this.resetPassword.Password !== this.resetPassword.ConfirmPassword) {
      this.message.push({
        severity: 'error',
        summary: 'error Message', detail: 'new password does not match with confirm password'
      });
      return;
    }
    this.authenticationService.ResetPassword(this.router.url.split('/')[2], this.resetPassword.Password)
      .then(res => {
        this.message.push({
          severity: 'success',
          summary: 'success Message', detail: 'Password successfully changed'
        });
        this.router.navigate(['login/' + this.message[this.message.length - 1].detail]);
      })
      .catch(error => {
        console.log(error);
      });
    return this.message;
  }

  private checkToken() {
    this.authenticationService.CheckToken(this.router.url.split('/')[2]).then(res => {
      this.resetPassword.UserName = res.data.UserName;
    })
      .catch(error => {
        this.message.push({
          severity: 'error',
          summary: 'error Message', detail: 'link invalid'
        });
      });
  }
}


