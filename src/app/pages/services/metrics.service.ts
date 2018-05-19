import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MetricsService {
    headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

    constructor(private http: HttpClient) {
    }

    getMetrics(url: string, code: string): Observable<any> {
        return this.http.post(`http://localhost:3000/api/getMetrics/${url}`,
            {code: code}, {headers: this.headers});
    }

    compareCode(url: string, code: string): Observable<any> {
        return this.http.post(`http://localhost:3000/api/compare-code/${url}`,
            {code: code}, {headers: this.headers});
    }
}
