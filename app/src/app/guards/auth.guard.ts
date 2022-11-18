import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.snackbar.open('Please Log In First', undefined, {
        duration: 3000,
        panelClass: ['red-snackbar'],
      });

      this.router.navigate(['login']);
      return false;
    }
  }
}
