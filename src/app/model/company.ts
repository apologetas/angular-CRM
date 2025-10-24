import {Contact} from './contact';

export interface Company{
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  code: string
  vatNumber: string;
  contactList?: Contact[];
}
