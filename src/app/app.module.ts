/**
 * @license
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DashboardJsModule} from './pages/dashboard-js/dashboard-js.module';
import {MetricsService} from './pages/services/metrics.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        DashboardJsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        ThemeModule.forRoot(),
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        MetricsService
    ],
})
export class AppModule {
}
