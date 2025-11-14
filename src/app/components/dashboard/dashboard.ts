import {Component, inject} from '@angular/core';
import {Toast} from 'primeng/toast';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import {CompanyTable} from '../company-table/company-table';
import {Router} from '@angular/router';
import {LucideAngularModule, Plus,LogOut} from 'lucide-angular';
import {AuthService} from '../../services/auth-service/auth-service';

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
  readonly logOut = LogOut;
  private authService = inject(AuthService);
  private router = inject(Router);

  addForm(){
    console.log('add');
    this.router.navigate(['/dashboard/add-company']);
  }

  onLogOut() {
    console.log('Log Out');
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }

}
