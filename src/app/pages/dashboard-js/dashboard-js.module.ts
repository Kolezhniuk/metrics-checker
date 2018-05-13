import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardJSComponent } from './dashboard-js.component';



@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    DashboardJSComponent,
  ],
})
export class DashboardModule { }
