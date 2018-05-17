import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';

import {DashboardCssRoutingModule, routedComponents} from './dashboard-css.routing.module';
import {DashboardCssComponent} from './dashboard-css.component';
import {NgxJsonViewerModule} from 'ngx-json-viewer';


@NgModule({
    imports: [
        ThemeModule,
        NgxJsonViewerModule,
        DashboardCssRoutingModule,
    ],
    declarations: [
        DashboardCssComponent,
        ...routedComponents,
    ],
})
export class DashboardCssModule {
}
