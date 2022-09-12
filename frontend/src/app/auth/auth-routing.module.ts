import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { RegisterWalkerComponent } from './pages/register-walker/register-walker.component';
import { SelectionUserComponent } from './pages/selection-user/selection-user.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register-walker', component: RegisterWalkerComponent },
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'selection-user', component: SelectionUserComponent },
      { path: '**', redirectTo: 'login' }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
