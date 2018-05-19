import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {DashboardJSComponent} from './dashboard-js.component';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@NgModule({
    imports: [
        ThemeModule,
        NgxJsonViewerModule,
        FormsModule,
        CommonModule,
    ],
    declarations: [
        DashboardJSComponent,
    ]
})
export class DashboardJsModule {
}
