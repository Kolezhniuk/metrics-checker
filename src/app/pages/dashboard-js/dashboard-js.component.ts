import {Component} from '@angular/core';
import {MetricsService} from '../services/metrics.service';
import {DashboardMainComponent} from '../dashboard-main/dashboard-main.component';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: '../dashboard-main/dashboard-main.component.html',
})
export class DashboardJSComponent extends DashboardMainComponent {

    constructor(protected metricService: MetricsService) {
        super(metricService);
        this.editorHeader = 'JavaScript Code:';
        this.metricHeader = 'Javascript Metric';
        this.urlSuffix = 'js';
    }
}



