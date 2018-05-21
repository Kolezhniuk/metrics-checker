import {Component, OnInit} from '@angular/core';
import {MetricsService} from '../services/metrics.service';
import {Chart} from 'chart.js';


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
    chart: any;
    fromDb: any;
    fromEditor: any;

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
        this.isLoaded = true;
        this.metricService.compareCode(this.urlSuffix, this.code).subscribe(data => {
            this.compareResults = data;
            this.prepareData();
            this.isLoaded = true;
        }, () => {
            this.isLoaded = false;
            this.error = 'Error parsing code or during request to server';
        });
    }

    prepareData() {
    }

    get getOptions() {
        return {
            maintainAspectRatio: true,
            responsive: true,
            legend: {
                labels: {
                    fontColor: '#484848',
                },
            },
            scales: {
                xAxes: [
                    {
                        // stacked: true,
                        gridLines: {
                            display: true,
                        },
                    },
                ],
                yAxes: [
                    {
                        // stacked: true,
                        gridLines: {
                            display: true,
                            beginAtZero: false
                        },
                    },
                ],
            },
        };

    }

}
