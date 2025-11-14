import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, from } from "rxjs";
import { Company } from '../model/company';
import { environment } from '../environments/environment';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CompanyRepository {
  private auth = inject(Auth);
  private http = inject(HttpClient);

  private getUserToken(): Observable<string> {
    this.auth.currentUser?.getIdToken().then(token => {
      console.log('Token:', token);

    });
    return from(this.auth.currentUser?.getIdToken()  || Promise.resolve(''));
  }


  public getAll(): Observable<Company[]> {
    return this.getUserToken().pipe(
      switchMap(token => {
        return this.http.get<any>(`${environment.firebaseUrl}/companies.json?auth=${token}`);
      }),
      map(data => {
        console.log('Raw data:', data);
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
        console.log('parsed:', companies);
        return companies;
      })
    );
  }

  addCompany(company: Company): Observable<Company> {
    return this.getUserToken().pipe(
      switchMap(token => {
        return this.http.post<{name: string}>(
          `${environment.firebaseUrl}/companies.json?auth=${token}`,
          company
        );
      }),
      map(response => ({
        ...company,
        firebaseKey: response.name
      }))
    );
  }
}
