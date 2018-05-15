import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class MetricsService {

    constructor(private http: HttpClient) {
    }

    getMetrics(code: string) {
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        const reqOption = {headers: headers};
        return this.http.post('http://localhost:3000/api/getMetrics', {code: code}, reqOption);
    }

    obtainCode(data: string) {
        const headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
        return this.http.post('http://localhost:3000/api/obtaincode', {code: data}, {headers: headers});
    }
}
