import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Subscription } from "rxjs";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: "app-puntuacion",
  templateUrl: "./puntuacion.component.html",
  styleUrls: ["./puntuacion.component.css"]
})
export class PuntuacionComponent implements OnInit, OnDestroy {
  datos: any;
  suscripcion: Subscription;
  hideTable = false;
  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(["(min-width: 560px)"])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.hideTable = false;
        } else {
          this.hideTable = true;
        }
      });
    this.suscripcion = this.userService.getUsers().subscribe(users => {
      this.datos = users;
    });
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }
}
