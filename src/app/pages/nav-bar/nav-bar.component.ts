import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  burger: HTMLDivElement;
  nav: HTMLUListElement;
  user = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.burger = document.querySelector(".burger") as HTMLDivElement;
    this.nav = document.querySelector(".nav-links") as HTMLUListElement;
    this.userService.isLoggedIn().subscribe(
      data => {
        this.user = data;
      },
      err => console.log(err)
    );
  }

  toggleMenu() {
    this.nav.classList.toggle("nav-active");

    this.burger.classList.toggle("toggle");
  }

  logOut() {
    this.userService
      .logOut()
      .then(() => {
        console.log("Cerro sesion");
        this.router.navigate([""]);
      })
      .catch(() => console.log("Error al cerrar sesion"));
  }
}
