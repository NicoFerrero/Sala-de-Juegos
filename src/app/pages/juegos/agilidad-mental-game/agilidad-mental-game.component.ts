import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-agilidad-mental-game',
  templateUrl: './agilidad-mental-game.component.html',
  styleUrls: ['./agilidad-mental-game.component.css'],
})
export class AgilidadMentalGameComponent implements OnInit {
  public puntos;
  public operador: number;
  public numero1: number;
  public numero2: number;
  public cuenta = '';
  public resultado: number;
  public numeroUsuario = '';
  public timer;
  public user;

  public segundos;
  public perdiste;

  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(private snackBar: MatSnackBar, private userService: UserService) {}

  ngOnInit() {
    this.userService.isLoggedIn().subscribe(user => {
      if (user) {
        this.userService.getUser(user.uid).subscribe(userData => {
          this.user = userData;
        });
      }
    });
  }

  EmpezarJuego() {
    this.puntos = 0;
    this.segundos = 10;
    this.numeroUsuario = '';
    this.perdiste = false;
    this.Timer();
    this.HacerCuenta();
  }

  HacerCuenta() {
    this.operador = Math.floor(Math.random() * (4 - 1)) + 1;
    this.numero1 = Math.floor(Math.random() * (50 - 1)) + 1;
    this.numero2 = Math.floor(Math.random() * (50 - 1)) + 1;

    switch (this.operador) {
      case 1:
        this.cuenta = `${this.numero1} + ${this.numero2} = `;
        this.resultado = this.numero1 + this.numero2;
        break;

      case 2:
        this.cuenta = `${this.numero1} - ${this.numero2} = `;
        this.resultado = this.numero1 - this.numero2;
        break;

      case 3:
        this.numero1 = this.operador = Math.floor(Math.random() * (10 - 1)) + 1;
        this.numero2 = this.operador = Math.floor(Math.random() * (10 - 1)) + 1;
        this.cuenta = `${this.numero1} X ${this.numero2} = `;
        this.resultado = this.numero1 * this.numero2;
        break;

      default:
        console.log('Ups.. Algo salio mal. El valor de la variable evaluada es: ' + this.operador);
    }

    console.log(`Resultado: ${this.resultado}`);
  }

  Calcular() {
    if (this.numeroUsuario === this.resultado.toString()) {
      this.openSnackBar('Bien!, ese era el numero!', 'Dismiss', 'success');
      this.user.agilidad_ari++;
      this.user.agilidad_ari_tot++;
      this.HacerCuenta();
      this.numeroUsuario = '';
      this.input.nativeElement.focus();
      this.segundos = 10;
      this.puntos++;
    } else {
      clearInterval(this.timer);
      this.GameOver();
    }
    this.userService.updateUser(this.user);
  }

  Timer() {
    this.timer = setInterval(() => {
      this.segundos--;
      if (this.segundos < 0) {
        clearInterval(this.timer);
        this.segundos = 0;
        this.GameOver();
        this.userService.updateUser(this.user);
      }
    }, 500);
  }

  GameOver() {
    this.perdiste = true;
    this.user.agilidad_ari_tot++;
    this.openSnackBar('Has perdido', 'Dismiss', 'error');
  }

  private openSnackBar(message: string, action: string, hasError: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [`${hasError}`],
    });
  }
}
