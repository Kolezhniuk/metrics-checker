import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MetricsService {

    constructor(private http: HttpClient) {
    }

    getMetrics(url: string, code: string): Observable<any> {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        const reqOption = {headers: headers};
        return this.http.post(url, {code: code}, reqOption);
    }

    obtainCode(data: string) {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        const reqOption = {headers: headers};
        return this.http.post('http://localhost:3000/api/obtaincode', {code: data}, reqOption);
    }
}
