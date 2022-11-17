import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signUpForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          this.snackbar.open(`${res.message}`, undefined, {
            duration: 3000,
            panelClass: ['green-snackbar'],
          });

          this.router.navigate(['login']);
          this.signUpForm.reset();
        },
        error: (err) => {
     

          this.snackbar.open(`${err?.error.message}`, undefined, {
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
        },
      });


    } else {
      // logic for throwing a error
      ValidateForm.validateAllFormFileds(this.signUpForm);
    }
  }
}
