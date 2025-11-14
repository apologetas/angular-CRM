import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '@angular/fire/auth';
import { Observable, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private injector = inject(EnvironmentInjector);

  register(email: string, password: string, displayName?: string): Observable<void> {
    return runInInjectionContext(this.injector, () => {
      return from(
        createUserWithEmailAndPassword(this.auth, email, password)
          .then(async (credential) => {
            if (displayName) {
              await updateProfile(credential.user, { displayName });
            }
          })
      );
    });
  }

  login(email: string, password: string): Observable<void> {
    return runInInjectionContext(this.injector, () => {
      return from(
        signInWithEmailAndPassword(this.auth, email, password).then(() => {})
      );
    });
  }

  logout(): Observable<void> {
    console.log("logout");
    return runInInjectionContext(this.injector, () => {
      return from(signOut(this.auth)
      );
    });
  }
}
