import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit, AfterViewChecked {
  public currentUser;
  public user;
  public ganadasAdivinar;
  public ganadasAgilidad;
  public ganadasAnagrama;
  public ganadasMemoria;
  public ganadasTateti;
  public ganadasPpt;
  public color;
  constructor(private userService: UserService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.currentUser = this.userService.currentUser();
    console.log(this.currentUser.providerData);
    this.userService.getUser(this.currentUser.uid).subscribe(data => {
      this.user = data;
      this.ganadasAdivinar = (this.user.adivina_num * 100) / this.user.adivina_num_tot;
      this.ganadasAgilidad = (this.user.agilidad_ari * 100) / this.user.agilidad_ari_tot;
      this.ganadasAnagrama = (this.user.anagrama * 100) / this.user.anagrama_tot;
      this.ganadasMemoria = (this.user.memoria * 100) / this.user.memoria_tot;
      this.ganadasTateti = (this.user.ttt * 100) / this.user.ttt_tot;
      this.ganadasPpt = (this.user.ppt * 100) / this.user.ppt_tot;
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  getColor(value: number) {
    if (value < 30) {
      this.color = 'warn';
    } else if (value > 30 && value < 60) {
      this.color = 'accent';
    } else {
      this.color = 'primary';
    }
    return this.color;
  }

  linkGoogleAccount() {
    this.userService.linkGoogle();
  }

  unlinkGoogleAccount() {
    this.userService.unlinkGoogle('google.com');
  }

  linkedAccount() {
    for (let i = 0; i < this.currentUser.providerData.length; i++) {
      if (this.currentUser.providerData[i].providerId === 'google.com') {
        return true;
      } else {
        return false;
      }
    }
  }
}
