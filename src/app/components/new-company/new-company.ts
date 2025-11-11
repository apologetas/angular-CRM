import { Component, QueryList, signal, ViewChildren } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewContact } from '../new-contact/new-contact';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { ToastModule } from 'primeng/toast';
import { LucideAngularModule, UserPlus, UserMinus } from 'lucide-angular';
import { FormControl, FormGroup } from '@angular/forms';
import { CompanyService } from '../../services/company/company-service';
import { Contact } from '../../model/contact';
import { Company } from '../../model/company';
import { finalize } from 'rxjs';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import {Router} from '@angular/router';
@Component({
  selector: 'new-company',
  imports: [
    HlmButtonImports,
    HlmInputImports,
    NewContact,
    LucideAngularModule,
    ReactiveFormsModule,
    ToastModule,
    HlmSpinnerImports
  ],
  templateUrl: './new-company.html'
})
export class NewCompany {
  @ViewChildren(NewContact) contactComponents!: QueryList<NewContact>;
  readonly addClientIcon = UserPlus;
  readonly removeContactIcon = UserMinus;
  newCompanyGroupForm: FormGroup;
  contacts = [1];
  isLoading = signal(false);
  company = signal<Company | null>(null);

  constructor(private companyService: CompanyService, private router: Router) {
    this.newCompanyGroupForm = new FormGroup({
      companyName: new FormControl('Pav', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      companyCode: new FormControl('38273823', [NewCompany.onlyNumbersValidator]),
      pvmCode: new FormControl('LT323', [NewCompany.pvmValidator]),
      companyAddress: new FormControl('adresas'),
      companyEmail: new FormControl('email@dd.com', [Validators.required, Validators.email]),
      companyPhone: new FormControl('+370576767', [NewCompany.phoneValidator]),
    })
  }

  addContact() {
    this.contacts.push(this.contacts.length + 1);
  }
  resetContacts() {
    this.contacts = [1];
  }

  removeContact() {
    if (this.contacts.length > 1) {
      this.contacts.pop();
    }
  }
  exitForm(): void {
    this.router.navigate(['dashboard'])
  }

  public submitForm() {
    if (this.newCompanyGroupForm.valid) {
      const formValue = this.newCompanyGroupForm.value;
      const contactList: Contact[] = this.contactComponents
        .map(component => component.getContactValue())
        .filter(contact =>
          contact.firstName || contact.lastName || contact.position || contact.phone
        );

      this.isLoading.set(true);
      this.resetContacts();
      this.companyService.addCompany(
        formValue.companyName,
        formValue.companyEmail,
        formValue.companyPhone,
        formValue.companyAddress || '',
        formValue.companyCode || '',
        formValue.pvmCode || '',
        contactList
      ).pipe(
        finalize(() => this.isLoading.set(false))
      ).subscribe({

        next: (company) => {
          this.company.set(company);

        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  private static onlyNumbersValidator(control: AbstractControl) {
    if (!control.value) return null;
    return /^\d+$/.test(control.value) ? null : { onlyNumbers: true };
  }

  private static pvmValidator(control: AbstractControl) {
    if (!control.value) return null;
    return /^(LT)?\d+$/.test(control.value) ? null : { invalidPvm: true };
  }

  private static phoneValidator(control: AbstractControl) {
    if (!control.value) return null;
    const value = control.value;

    if (!value.startsWith('+370')) {
      return { phonePrefix: true };
    }

    if (!/^\+370\d+$/.test(value)) {
      return { phoneOnlyNumbers: true };
    }

    if (value.length < 10) {
      return { phoneTooShort: true };
    }

    if (value.length > 12) {
      return { phoneTooLong: true };
    }

    return null;
  }
}
