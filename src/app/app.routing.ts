import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/shared/guards/index';

import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './core/home/home.component';

/* Reset password module*/
import { ForgotPasswordComponent } from '../../src/app/core/forgot/forgot.component';
import { ResetPasswordComponent } from '../../src/app/core/reset-password/reset-password.component';
import { SetupComponent, SetupEditComponent } from './components/setup/shared/index';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/:message', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'reset/:token', component: ResetPasswordComponent },
  { path: '', component: LoginComponent },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: ':moduleName/notfound', component: PageNotFoundComponent },
      { path: ':moduleName/setups', component: SetupComponent },
      { path: ':moduleName/setup/add', component: SetupEditComponent },
      { path: ':moduleName/setup/:id/edit', component: SetupEditComponent }
    ]
  }
];
export const routing = RouterModule.forRoot(routes);
