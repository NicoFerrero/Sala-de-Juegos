import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adivinar-numero-game',
  templateUrl: './adivinar-numero-game.component.html',
  styleUrls: ['./adivinar-numero-game.component.css'],
})
export class AdivinarNumeroGameComponent implements OnInit {
  public puntos;
  public intentosRestantes;
  public numeroUsuario;
  public numeroMisterioso;
  public perdiste;
  public user;

  constructor(private snackBar: MatSnackBar, private userService: UserService) {}

  ngOnInit() {
    this.EmpezarJuego();
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
    this.intentosRestantes = 5;
    this.numeroUsuario = 1;
    this.numeroMisterioso = Math.floor(Math.random() * (101 - 1)) + 1;
    console.log(this.numeroMisterioso);
    this.perdiste = false;
  }

  Adivinar() {
    if (this.numeroUsuario === this.numeroMisterioso) {
      this.openSnackBar('Bien!, ese era el numero!', 'Dismiss', 'success');
      this.user.adivina_num++;
      this.user.adivina_num_tot++;
      this.numeroMisterioso = Math.floor(Math.random() * (101 - 1)) + 1;
      console.log(this.numeroMisterioso);
      this.puntos++;
    } else {
      console.log('Ups...', 'Ese no era el número. Sigue intentado.');
      this.intentosRestantes--;

      if (this.intentosRestantes < 1) {
        this.openSnackBar(
          'Has perdido, El numero era el ' + this.numeroMisterioso,
          'Dismiss',
          'error',
        );
        this.user.adivina_num_tot++;
        this.perdiste = true;
      }
    }

    this.userService.updateUser(this.user);
  }

  private openSnackBar(message: string, action: string, hasError: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [`${hasError}`],
    });
  }
}
