import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardJsModule} from './dashboard-js/dashboard-js.module';
import {DashboardCssModule} from './dashboard-css/dashboard-css.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {DashboardMainComponent} from './dashboard-main/dashboard-main.component';
import {NgxJsonViewerModule} from "ngx-json-viewer";

const PAGES_COMPONENTS = [
    PagesComponent,
    DashboardMainComponent
];

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        DashboardJsModule,
        DashboardCssModule,
        NgxJsonViewerModule
    ],
    declarations: [
        ...PAGES_COMPONENTS,
    ],
})
export class PagesModule {
}
