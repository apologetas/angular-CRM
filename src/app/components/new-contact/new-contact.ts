import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';

import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Contact} from '../../model/contact';
@Component({
  selector: 'app-new-contact',
  imports: [HlmButtonImports, HlmInputImports, FormsModule, ReactiveFormsModule],
  templateUrl: './new-contact.html'
})
export class NewContact {

  contactGroupForm: FormGroup;

  constructor() {
    this.contactGroupForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('' ),
      position: new FormControl('' ),
      phoneNumber: new FormControl(''),
    })
  }

  getContactValue(): Contact {
    return {
      firstName: this.contactGroupForm.value.firstName,
      lastName: this.contactGroupForm.value.lastName,
      position: this.contactGroupForm.value.position,
      phone: this.contactGroupForm.value.phoneNumber
    };
  }


}
