import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardJSComponent } from './dashboard-js/dashboard-js.component';
import {DashboardCssComponent} from "./dashboard-css/dashboard-css.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard-js',
    component: DashboardJSComponent,
  }, {
    path: 'dashboard-css',
    component: DashboardCssComponent,
  }, {
    path: '',
    redirectTo: 'dashboard-js',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
