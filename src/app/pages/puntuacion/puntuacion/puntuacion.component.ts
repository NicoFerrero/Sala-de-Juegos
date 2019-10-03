import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.component.html',
  styleUrls: ['./puntuacion.component.css'],
})
export class PuntuacionComponent implements OnInit, OnDestroy {
  datos: any;
  suscripcion: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.suscripcion = this.userService.getUsers().subscribe(users => {
      this.datos = users;
    });
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }
}
