import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-anagrama-game',
  templateUrl: './anagrama-game.component.html',
  styleUrls: ['./anagrama-game.component.css'],
})
export class AnagramaGameComponent implements OnInit {
  public palabras = [
    'mochila',
    'edificio',
    'casa',
    'mansion',
    'auto',
    'perro',
    'lancha',
    'moto',
    'espejo',
    'pastel',
    'computadora',
    'jwt',
    'javascript',
    'videojuegos',
    'amistad',
    'teclado',
    'cocina',
    'ducha',
    'cuchara',
    'cuchillo',
    'tenedor',
    'comida',
    'tijera',
    'angular',
    'ionic',
    'montaña',
    'cielo',
    'america',
    'europa',
    'africa',
    'asia',
    'oceania',
    'argentina',
    'antartida',
    'perro',
    'gato',
    'cerdo',
    'tigre',
    'paloma',
  ];

  public puntos;
  public intentosRestantes;
  public palabraUsuario;
  public palabraSeleccionada;
  public palabraRandom;
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
    this.palabraUsuario = '';
    this.GenerarPalabraAleatoria();
    this.perdiste = false;
  }

  GenerarPalabraAleatoria() {
    let numero = Math.floor(Math.random() * (this.palabras.length - 1 - 0)) + 0;
    this.palabraSeleccionada = this.palabras[numero];
    console.log(`Numero: ${numero}, Palabra seleccionada: ${this.palabraSeleccionada}`);

    let a = this.palabraSeleccionada.split('');
    let n = a.length;

    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }

    this.palabraRandom = a.join('');
    console.log(`La palabra random es: ${this.palabraRandom}`);
  }

  VerficarPalabra() {
    if (this.palabraUsuario.toLowerCase() === this.palabraSeleccionada.toLowerCase()) {
      this.openSnackBar('Bien!, esa era la palabra!', 'Dismiss', 'success');
      this.user.anagrama++;
      this.user.anagrama_tot++;
      this.GenerarPalabraAleatoria();
      this.palabraUsuario = '';
      this.puntos++;
    } else {
      this.intentosRestantes--;

      if (this.intentosRestantes <= 0) {
        this.GameOver();
      } else {
        console.log('Ups...', 'Esa no es la palabra, sigue intentado!');
      }
    }
    this.userService.updateUser(this.user);
  }

  GameOver() {
    this.perdiste = true;
    this.user.anagrama_tot++;
    this.openSnackBar(
      'Has perdido, la palabra era ' + this.palabraSeleccionada,
      'Dismiss',
      'error',
    );
  }

  private openSnackBar(message: string, action: string, hasError: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [`${hasError}`],
    });
  }
}
