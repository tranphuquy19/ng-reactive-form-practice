import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components';

import { JsonStringifyPipe, LoggerPipe, MaterialModule } from '@shared/index';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    JsonStringifyPipe,
    LoggerPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    HttpClientModule,
    MaterialModule
  ]
})
export class AuthModule { }
