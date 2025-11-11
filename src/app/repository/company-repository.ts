import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {Company} from '../model/company';
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyRepository {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Company[]> {
    return this.http.get<any>(`${environment.firebaseUrl}/companies.json`)
      .pipe(
        map(data => {
          const companies: Company[] = [];
          if (data) {
            Object.entries(data).forEach(([firebaseKey, value]: [string, any]) => {
              if (value && typeof value === 'object') {
                companies.push({
                  ...value,
                  firebaseKey: firebaseKey
                });
              }
            });
          }
          return companies;
        })
      );
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<{name: string}>(`${environment.firebaseUrl}/companies.json`, company)
      .pipe(
        map(response => ({
          ...company,
          firebaseKey: response.name
        }))
      );
  }
}
