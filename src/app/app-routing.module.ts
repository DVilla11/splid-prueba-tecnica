import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './components/group/group.component';
import { HomeComponent } from './components/home/home.component';
import { LoginFromComponent } from './components/login-from/login-from.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'singup', component: RegistrationFormComponent },
  { path: 'login', component: LoginFromComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'group/:name', component: GroupComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
