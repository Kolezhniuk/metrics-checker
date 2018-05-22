import {Component} from '@angular/core';
import {MetricsService} from '../services/metrics.service';
import {DashboardMainComponent} from '../dashboard-main/dashboard-main.component';
import {Chart} from 'chart.js';

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

    prepareData() {
        debugger;
        const fromDbData = this.compareResults.flattenDb;
        console.log(fromDbData);
        const fromEditor = this.compareResults.flattenEditor;
        console.log(fromEditor);

        this.chart = new Chart('canvas', {
            type: 'horizontalBar',
            data: {
                labels: Object.keys(fromDbData),
                datasets: [{
                    data: Object.values(fromDbData),
                    label: 'Data from db',
                    backgroundColor: '#ca34ff',
                }, {
                    data: Object.values(fromEditor),
                    label: 'Data from editor',
                    backgroundColor: '#ffcc23',
                }],
            },
            options: this.getOptions
        });
    }
}



