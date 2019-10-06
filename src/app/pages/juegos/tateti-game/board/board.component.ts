import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  public squares: any[];
  public xIsNext: boolean;
  public winner: string;
  public contador: number = 0;
  public gano = false;
  public user;
  public perdiste;
  public movimientos;

  constructor(private snackBar: MatSnackBar, private userService: UserService) {}

  ngOnInit() {
    this.newGame();
    this.userService.isLoggedIn().subscribe(user => {
      if (user) {
        this.userService.getUser(user.uid).subscribe(userData => {
          this.user = userData;
        });
      }
    });
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.gano = false;
    this.perdiste = false;
    this.movimientos = 0;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.winner) {
      if (!this.squares[idx]) {
        this.squares.splice(idx, 1, this.player);
        this.xIsNext = !this.xIsNext;
      }
    }
    this.movimientos++;

    this.winner = this.calculateWinner();
    if (this.winner === 'X' && !this.gano) {
      this.contador++;
      this.openSnackBar('Bien!, has ganado!', 'Dismiss', 'success');
      this.user.ttt++;
      this.user.ttt_tot++;
      this.gano = true;
      this.perdiste = true;
    } else if (this.winner === 'O' && !this.gano) {
      this.openSnackBar('Has perdido', 'Dismiss', 'error');
      this.user.ttt_tot++;
      this.perdiste = true;
    } else if (this.movimientos === 9) {
      this.openSnackBar('Han empatado', 'Dismiss', 'warning');
      this.user.ttt_tot++;
      this.perdiste = true;
    }
    this.userService.updateUser(this.user);
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  private openSnackBar(message: string, action: string, hasError: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [`${hasError}`],
    });
  }
}
