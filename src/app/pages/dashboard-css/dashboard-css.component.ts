import {Component} from '@angular/core';
import {DashboardMainComponent} from '../dashboard-main/dashboard-main.component';
import {MetricsService} from "../services/metrics.service";

@Component({
    selector: 'ngx-css',
    templateUrl: '../dashboard-main/dashboard-main.component.html'
})
export class DashboardCssComponent extends DashboardMainComponent {

    constructor(protected metricService: MetricsService) {
        super(metricService);
        this.editorHeader = 'CSS Code:';
        this.metricHeader = 'CSS Metric';
        this.url = 'http://localhost:3000/api/getMetrics/css';
    }
}
