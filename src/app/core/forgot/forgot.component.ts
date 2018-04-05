import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from './../../shared/route.service';
import { ForgotPasswordModel } from './forgot.model';
import { Message } from 'primeng/primeng';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot.component.html'
})

export class ForgotPasswordComponent {

  public message: Message[] = [];
  public forgotPassword = new ForgotPasswordModel();
  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public routeService: RouteService,
    private authenticationService: AuthenticationService,
  ) {

  }

  public sendLink() {
    this.authenticationService
      .ResetPasswordLink(this.forgotPassword.Email).then(res => {

        this.message.push({
          severity: 'error',
          summary: 'error Message', detail: 'check your email for reset password link'
        });
      });
  }

  public cancel() {
    this.router.navigate(['login']);
  }
}


