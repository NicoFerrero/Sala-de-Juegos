import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.css'],
})
export class MemoryGameComponent implements OnInit {
  private images = [
    { id: 1, url: '../../../../assets/10.png' },
    { id: 2, url: '../../../../assets/J.png' },
    { id: 3, url: '../../../../assets/K.png' },
    { id: 4, url: '../../../../assets/Q.png' },
  ];
  public imagesInact = '../../../../assets/poker.png';
  public cards: Array<any>;
  private lastSelectId;
  private countAciertos: number;
  public contIntentos: number;
  public puntos;
  public timer;
  public segundos;
  public perdiste;
  public user;
  public toggle;

  constructor(private snackBar: MatSnackBar, private userService: UserService) {}

  ngOnInit() {
    this.toggle = true;
    this.userService.isLoggedIn().subscribe(user => {
      if (user) {
        this.userService.getUser(user.uid).subscribe(userData => {
          this.user = userData;
        });
      }
    });
  }

  public IniciarJuego() {
    this.cards = [];
    this.lastSelectId = null;
    this.countAciertos = 0;
    this.contIntentos = 0;
    let countIndex = 0;
    this.puntos = 0;
    this.perdiste = false;
    this.segundos = 20;
    this.Timer();
    this.toggle = !this.toggle;

    for (let i = 0; i < 4 * 2; i++) {
      if (countIndex === 4) {
        countIndex = 0;
      }

      const img = this.images[countIndex];

      this.cards.push({
        id: img.id,
        url: img.url,
        visible: false, // si la imagen se muestra
        active: true, // seleccionable
      });
      countIndex++;
    }
    this.RandomArray(this.cards);
  }

  public CardSelected(idx) {
    if (!this.cards[idx].active) {
      return;
    }
    this.cards[idx].visible = true;

    if (this.lastSelectId == null) {
      this.lastSelectId = idx;
      this.cards[idx].visible = true;
      this.cards[idx].active = false;
    } else {
      if (this.cards[this.lastSelectId].id === this.cards[idx].id) {
        // Si coinciden, se aumentan los aciertos
        this.countAciertos = this.countAciertos + 1;
        this.cards[idx].visible = true;
        this.cards[idx].active = false;
        this.lastSelectId = null;
      } else {
        // Si no hacen pareja, oculto las cartas luego de esperar medio segundo
        setTimeout(() => {
          this.cards[this.lastSelectId].visible = false; // Ocultar
          this.cards[this.lastSelectId].active = true; // Activar
          this.cards[idx].visible = false;
          this.lastSelectId = null;
        }, 0.5 * 1000);
      }
    }
    if (4 === this.countAciertos) {
      this.openSnackBar('Bien!, has ganado!', 'Dismiss', 'success');
      this.user.memoria++;
      this.user.memoria_tot++;
      this.perdiste = true;
      this.puntos++;
      // console.log(this.msgResultado);
      clearInterval(this.timer);
    }
    this.userService.updateUser(this.user);
  }

  RandomArray(array) {
    let currentIndex = array.length;
    let randomIndex;
    let temporaryValue;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
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
    }, 1000);
  }

  GameOver() {
    this.perdiste = true;
    this.user.memoria_tot++;
    this.openSnackBar('Has perdido', 'Dismiss', 'error');
  }

  private openSnackBar(message: string, action: string, hasError: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [`${hasError}`],
    });
  }
}
