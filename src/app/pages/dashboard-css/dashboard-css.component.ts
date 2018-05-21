import {Component} from '@angular/core';
import {DashboardMainComponent} from '../dashboard-main/dashboard-main.component';
import {MetricsService} from '../services/metrics.service';
import {Chart} from 'chart.js';

@Component({
    selector: 'ngx-css',
    templateUrl: '../dashboard-main/dashboard-main.component.html'
})
export class DashboardCssComponent extends DashboardMainComponent {
    /**
     * Keys that shows on the graphics
     * @type {string[]}
     */
    keys = ['selectors', 'selectorsByAttribute',
        'selectorsByClass', 'selectorsById', 'selectorsByPseudo',
        'colors', 'duplicatedSelectors', 'duplicatedProperties', 'rules', 'mediaQueries'];

    constructor(protected metricService: MetricsService) {
        super(metricService);
        this.editorHeader = 'CSS Code:';
        this.metricHeader = 'CSS Metric';
        this.urlSuffix = 'css';
    }


    prepareData() {

        const fromDbData = this.filterByKeys(this.compareResults.fromDb, this.keys);

        const fromEditor = this.filterByKeys(this.compareResults.fromEditor, this.keys);

        this.chart = new Chart('canvas', {
            type: 'horizontalBar',
            data: {
                labels: Object.keys(fromDbData),
                datasets: [{
                    data: Object.values(fromDbData),
                    label: 'Data from db',
                    backgroundColor: '#65b2ff',
                }, {
                    data: Object.values(fromEditor),
                    label: 'Data from editor',
                    backgroundColor: '#ff657f',
                }],
            },
            options: this.getOptions
        });
    }

    filterByKeys(props, filterKey) {
        return Object.keys(props).reduce((acc, cur) => {
            if (filterKey.includes(cur)) {
                acc[cur] = props[cur];
            }
            return acc;
        }, {});
    }
}
