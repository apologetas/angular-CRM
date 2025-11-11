import { Injectable } from '@angular/core';
import { Company } from '../../model/company';
import { Contact } from '../../model/contact';
import { CompanyRepository } from '../../repository/company-repository';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companyListSubject = new BehaviorSubject<Company[]>([]);
  public companies$ = this.companyListSubject.asObservable();

  constructor(
    private companyRepository: CompanyRepository,
    private messageService: MessageService
  ) {
    this.loadCompanies();
  }

  private loadCompanies(): void {
    this.companyRepository.getAll().subscribe({
      next: companies => {
        this.companyListSubject.next(companies);
      },
      error: err => {
        console.error('Error loading companies:', err);
      }
    });
  }

  public addCompany(
    name: string,
    email: string,
    phone: string,
    address: string,
    code: string,
    vatNumber: string,
    contactList?: Contact[]
  ): Observable<Company> {
    const newCompany: Company = {
      name,
      email,
      phone,
      address,
      code,
      vatNumber,
      contactList
    };

    return this.companyRepository.addCompany(newCompany).pipe(
      tap(
        (company) => {
          const currentList = this.companyListSubject.value;
          this.companyListSubject.next([...currentList, company]);
          this.messageService.add({
            severity: 'success',
            summary: 'Pridėtas',
            detail: 'Duomenys sėkmingai pridėti !',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Klaida',
            detail: 'Nepavyko pridėti duomenų',
          });
        }
      )
    );
  }
}
