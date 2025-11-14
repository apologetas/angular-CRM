import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth-service/auth-service';

@Component({
  selector: 'app-login',
  imports: [HlmButtonImports, HlmInputImports, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })


  }
  onLogin() {
    console.log(this.loginForm.value);
    console.log("button pressed");

    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        { next: () => {
            console.log('login successful!');
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error('Login failed:', error);
            alert('login failed: ' + error.message);
          }}
      )
    }

  }

}
