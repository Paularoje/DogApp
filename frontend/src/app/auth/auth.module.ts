import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterWalkerComponent } from './pages/register-walker/register-walker.component';
import { MainComponent } from './pages/main/main.component';
import { SelectionUserComponent } from './pages/selection-user/selection-user.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterWalkerComponent,
    MainComponent,
    SelectionUserComponent,
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
