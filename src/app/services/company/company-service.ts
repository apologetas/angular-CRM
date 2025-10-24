import {Inject, Injectable} from '@angular/core';
import {Company} from '../../model/company';
import {Contact} from '../../model/contact';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public  addCompany(name: string, email: string, phone: string, address: string,
                    code: string, vatNumber: string, contactList?: Contact[]): Company {
    const newCompany : Company = {
      name:name,
      email:email,
      phone : phone,
      address: address,
      code: code,
      vatNumber: vatNumber,
      contactList: contactList
    };

    console.log(newCompany);
    return newCompany;
  }


}
