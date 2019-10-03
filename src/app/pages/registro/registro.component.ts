import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(6)]],
    });

    this.userService.eventAuthError$.subscribe(data => {
      if (data) {
        this.openSnackBar(data, 'dismiss', 'error');
      }
    });
  }

  onRegistro() {
    this.userService
      .register(this.registroForm.value)
      .then(res => {
        this.router.navigate(['/dashboard']);
        console.log(res);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  private openSnackBar(message: string, action: string, hasError: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: [`${hasError}`],
    });
  }
}
