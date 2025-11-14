import { Component } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth-service';

@Component({
  selector: 'app-register',
  imports: [
    HlmButton,
    HlmInput,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html'
})
export class Register {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.value.email,
        this.registerForm.value.password
      ).subscribe({
        next: () => {
          console.log('Registration successful!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed: ' + error.message);
        }
      });
    }
  }
}
