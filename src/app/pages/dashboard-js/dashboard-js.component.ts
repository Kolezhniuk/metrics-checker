import {Component, Input} from '@angular/core';
import {MetricsService} from '../services/metrics.service';

@Component({
    selector: 'ngx-dashboard',
    styleUrls: ['./dashboard-js.component.scss'],
    templateUrl: './dashboard-js.component.html',
})
export class DashboardJSComponent {

    isLoaded = false;
    code: string;
    metrics: any;
    error: string;

    constructor(private metricService: MetricsService) {
    }


    onGetMetricsCLick() {
        if (this.code) {
            this.metricService.getMetrics(this.code).subscribe(result => {
                this.metrics = result;
                this.isLoaded = true;
                this.error = '';
            }, () => {
                this.isLoaded = false;
                this.error = 'Error parsing code or during request to server' ;

            });
        } else {
            this.error = 'Enter code';
        }
    }
}



