import {Component, QueryList, ViewChildren} from '@angular/core';
import {AbstractControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {NewContact} from '../new-contact/new-contact';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { LucideAngularModule, UserPlus,UserMinus  } from 'lucide-angular';
import {FormControl,FormGroup} from '@angular/forms';
import {CompanyService} from '../../services/company/company-service';
import {Contact} from '../../model/contact';

@Component({
  selector: 'new-company',
  imports: [
    HlmButtonImports, HlmDialogImports, HlmInputImports,
    BrnDialogImports, NewContact, LucideAngularModule, ReactiveFormsModule
  ],
  templateUrl: './new-company.html'
})
export class NewCompany {
  @ViewChildren(NewContact) contactComponents!: QueryList<NewContact>;
   readonly addClientIcon = UserPlus;
   readonly removeContactIcon = UserMinus;
   newCompanyGroupForm: FormGroup;
  contacts = [1];

  constructor(private companyService: CompanyService,) {

    this.newCompanyGroupForm = new FormGroup({
      companyName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      companyCode: new FormControl('', [NewCompany.onlyNumbersValidator]),
      pvmCode: new FormControl('', [NewCompany.pvmValidator]),
      companyAddress: new FormControl(''),
      companyEmail: new FormControl('', [Validators.required,Validators.email]),
      companyPhone: new FormControl('', [NewCompany.phoneValidator]),
    })
  }
  addContact(){
    this.contacts.push(this.contacts.length + 1);
  }
  removeContact(){
    if(this.contacts.length > 1){
      this.contacts.pop();
    }
  }
  public submitForm() {
    if (this.newCompanyGroupForm.valid) {
      const formValue = this.newCompanyGroupForm.value;
      const contactList: Contact[] = this.contactComponents
        .map(component => component.getContactValue())
        .filter(contact =>
          contact.firstName || contact.lastName || contact.position || contact.phone
        );

      const company = this.companyService.addCompany(
        formValue.companyName,
        formValue.companyEmail,
        formValue.companyPhone,
        formValue.companyAddress || '',
        formValue.companyCode || '',
        formValue.pvmCode || '',
        contactList
      );
      console.log('Company created:', company);
    }
  }
    private static onlyNumbersValidator(control: AbstractControl) {
    if (!control.value) return null;
    return /^\d+$/.test(control.value) ? null : { onlyNumbers: true };
  }

  private static pvmValidator(control: AbstractControl) {
    if (!control.value) return null;
    return  /^(LT)?\d+$/.test(control.value) ? null : { invalidPvm: true };
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
