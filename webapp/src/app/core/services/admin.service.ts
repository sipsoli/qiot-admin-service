import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService  {

  private REST_API_SERVER = environment.REST_API_SERVER;

  constructor(private httpClient: HttpClient) { }

  public pauseAllGasCollectors(): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/gas/pause';
    return this.httpClient.post(url, {});
  }

  public resumeAllGasCollectors(): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/gas/resume';
    return this.httpClient.post(url, {});
  }

  public updateIntervalAllGasCollectors(interval: number): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/gas/change?interval=' + interval;
    return this.httpClient.post(url, {});
  }

  public pauseGasCollector(stationId: string): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/gas/pause/' + stationId;
    return this.httpClient.post(url, {});
  }

  public resumeGasCollector(stationId: string): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/gas/resume/' + stationId;
    return this.httpClient.post(url, {});
  }

  public updateIntervalGasCollector(stationId: string, interval: number): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/gas/change/' + stationId + '?interval=' + interval;
    return this.httpClient.post(url, {});
  }

  public pauseAllPollutionCollectors(): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/pollution/pause';
    return this.httpClient.post(url, {});
  }

  public resumeAllPollutionCollectors(): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/pollution/resume';
    return this.httpClient.post(url, {});
  }

  public updateIntervalAllPollutionCollectors(interval: number): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/pollution/change?interval=' + interval;
    return this.httpClient.post(url, {});
  }

  public pausePollutionCollector(stationId: string): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/pollution/pause/' + stationId;
    return this.httpClient.post(url, {});
  }

  public resumePollutionCollector(stationId: string): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/pollution/resume/' + stationId;
    return this.httpClient.post(url, {});
  }

  public updateIntervalPollutionCollector(stationId: string, interval: number): Observable<any> {
    const url = this.REST_API_SERVER + '/admin/pollution/change/' + stationId + '?interval=' + interval;
    return this.httpClient.post(url, {});
  }

}
