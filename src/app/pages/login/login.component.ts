import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(6)]],
    });

    this.userService.eventAuthError$.subscribe(data => {
      if (data) {
        this.openSnackBar(data, 'dismiss', 'error');
      }
    });
  }

  googleLogin(e) {
    e.preventDefault();
    this.userService.loginGoogle();
  }

  onLogin() {
    this.userService.login(this.loginForm.value);
  }

  private openSnackBar(message: string, action: string, hasError: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: [`${hasError}`],
    });
  }

  preventDefault(e) {
    e.preventDefault();
  }
}
