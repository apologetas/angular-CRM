import { Component, OnInit } from '@angular/core';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { CompanyService} from '../../services/company/company-service';
import { Company } from '../../model/company';
import { Contact } from '../../model/contact';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-table',
  imports: [TreeTableModule, CommonModule],
  templateUrl: './company-table.html'
})
export class CompanyTable implements OnInit {
  files: TreeNode<Company | Contact>[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.companies$.subscribe(companies => {
      this.files = this.mapCompaniesToTreeNodes(companies);
    });
  }

  private mapCompaniesToTreeNodes(companies: Company[]): TreeNode<Company | Contact>[] {
    return companies.map(company => ({
      data: company,
      children: company.contactList?.map(contact => ({
        data: contact
      })) || []
    }));
  }
}
