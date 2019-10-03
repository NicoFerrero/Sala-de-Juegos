import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ppt-game',
  templateUrl: './ppt-game.component.html',
  styleUrls: ['./ppt-game.component.css'],
})
export class PptGameComponent implements OnInit {
  public contador: number = 0;
  public msgResultado: string;
  public valido: boolean;
  public eleccionMaquina: string;
  private eleccionUser: string;
  public imagenMaquina: string;
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
    this.imagenMaquina = '../../../../assets/nada.png';
  }

  Elegir(numberUs: number) {
    this.eleccionUser = this.TomarEleccion(numberUs);
    this.eleccionMaquina = this.ElegirMaquina();
    this.valido = false;
    this.DecidirGanador();
  }

  ElegirMaquina() {
    const numEleccion: number = Math.floor(Math.random() * (4 - 1) + 1);
    const auxReturn = this.TomarEleccion(numEleccion);

    switch (auxReturn) {
      case 'piedra': {
        this.imagenMaquina = '../../../../assets/piedra.png';
        break;
      }
      case 'papel': {
        this.imagenMaquina = '../../../../assets/papel.png';
        break;
      }
      default: {
        this.imagenMaquina = '../../../../assets/tijera.png';
        break;
      }
    }

    return auxReturn;
  }

  TomarEleccion(eleccion) {
    let auxReturn = 'tijera';
    switch (eleccion) {
      case 1: {
        auxReturn = 'piedra';
        break;
      }
      case 2: {
        auxReturn = 'papel';
        break;
      }
      default: {
        auxReturn = 'tijera';
        break;
      }
    }
    return auxReturn;
  }

  public DecidirGanador() {
    let mensajeNum = 1;

    switch (this.eleccionUser) {
      case 'piedra': {
        switch (this.eleccionMaquina) {
          case 'piedra': {
            mensajeNum = 2;
            break;
          }
          case 'papel': {
            mensajeNum = 3;
            break;
          }
          default: {
            mensajeNum = 1;
            break;
          }
        }
        break;
      }
      case 'papel': {
        switch (this.eleccionMaquina) {
          case 'piedra': {
            mensajeNum = 1;
            break;
          }
          case 'papel': {
            mensajeNum = 2;
            break;
          }
          default: {
            mensajeNum = 3;
            break;
          }
        }
        break;
      }
      default: {
        switch (this.eleccionMaquina) {
          case 'piedra': {
            mensajeNum = 3;
            break;
          }
          case 'papel': {
            mensajeNum = 1;
            break;
          }
          default: {
            mensajeNum = 2;
            break;
          }
        }
        break;
      }
    }

    switch (mensajeNum) {
      case 1: {
        this.openSnackBar('Bien!, has ganado!', 'Dismiss', 'success');
        this.user.ppt++;
        this.user.ppt_tot++;
        this.contador = this.contador + 1;
        this.valido = true;
        break;
      }
      case 2: {
        this.openSnackBar('Han empatado', 'Dismiss', 'warning');
        this.user.ppt_tot++;
        break;
      }
      default: {
        this.openSnackBar('La maquina gana', 'Dismiss', 'error');
        this.user.ppt_tot++;
        break;
      }
    }
    this.userService.updateUser(this.user);
  }

  private openSnackBar(message: string, action: string, hasError: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
      panelClass: [`${hasError}`],
    });
  }
}
