import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiUrl } from '../../shared';

@Injectable()
export class MasterService {

  constructor(private http: Http) { }

  getStateDDOs(): Promise<any> {
    return this.http.get(ApiUrl.MAIN_URI + 'State/ddo')
      .toPromise()
      .then(response => {
        let results = response.json();
        results.map((item) => {
          item.label = item.Name;
          item.value = item.Id;
        });
        return results;
      })
      .catch(this.handleError);
  }

  public companyTypeDDOs(): Promise<any> {
    return this.http.get(ApiUrl.MAIN_URI + 'InsuranceCompany/insurancecompanytypeddo')
      .toPromise()
      .then(response => {
        let results = response.json();
        results.map((item) => {
          item.label = item.Name;
          item.value = item.Id;
        });
        return results;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
