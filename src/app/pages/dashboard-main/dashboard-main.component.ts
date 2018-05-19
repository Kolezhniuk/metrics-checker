import {Component, OnInit} from '@angular/core';
import {MetricsService} from '../services/metrics.service';

@Component({
    selector: 'ngx-dashboard-main',
    templateUrl: './dashboard-main.component.html',
    styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

    editorHeader: string;
    metricHeader: string;
    isLoaded = false;
    code: string;
    metrics: any;
    error: string;
    urlSuffix: string;
    compareResults: any;


    constructor(protected metricService: MetricsService) {
    }

    ngOnInit() {
    }

    onGetMetricsCLick() {
        if (this.code) {
            this.metricService.getMetrics(this.urlSuffix, this.code).subscribe(result => {
                this.metrics = result;
                this.isLoaded = true;
                this.error = '';
            }, () => {
                this.isLoaded = false;
                this.error = 'Error parsing code or during request to server';

            });
        } else {
            this.error = 'Enter code';

        }
    }

    onCompareCLick() {
        this.metricService.compareCode(this.urlSuffix, this.code).subscribe(data => {
            this.compareResults = data;
            this.isLoaded = true;
        }, () => {
            this.isLoaded = false;
            this.error = 'Error parsing code or during request to server';
        });
    }
}
