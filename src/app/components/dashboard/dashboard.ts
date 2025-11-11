import { Component } from '@angular/core';
import {Toast} from 'primeng/toast';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import {CompanyTable} from '../company-table/company-table';
import {Router} from '@angular/router';
import {LucideAngularModule, Plus, UserMinus} from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  imports: [
    Toast,
    HlmButtonImports,
    CompanyTable,
    LucideAngularModule


  ],
  templateUrl: './dashboard.html'
})

export class Dashboard {

  readonly plusIcon = Plus
  constructor(private router:Router) {

  }
  addForm(){
    this.router.navigate(['add-company']);
  }


  protected readonly removeContactIcon = UserMinus;
}
