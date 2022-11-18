import ValidateForm from 'src/app/helpers/validateForm';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Send to obj to database
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          // alert(res.message)
          this.snackbar.open(`${res.message}`, undefined, {
            duration: 3000,
            panelClass: ['green-snackbar'],
          });
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          setTimeout(() => {
            this.router.navigate(['dashboard']);
          }, 2000);
        },
        error: (err) => {
          this.snackbar.open('User not Found', undefined, {
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
        },
      });
    } else {
      // throw the error using snackbar
      console.log('Form is invalid');

      ValidateForm.validateAllFormFileds(this.loginForm);
      // alert('Form is invalid');

      this.snackbar.open('Invalid Form', undefined, {
        duration: 3000,
        panelClass: ['red-snackbar'],
      });
    }
  }
}
