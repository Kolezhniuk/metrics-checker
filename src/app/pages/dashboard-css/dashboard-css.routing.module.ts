import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardCssComponent} from './dashboard-css.component';

const routes: Routes = [{
    path: 'dashboard-css',
    component: DashboardCssComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardCssRoutingModule {
}

export const routedComponents = [
    DashboardCssComponent
];
