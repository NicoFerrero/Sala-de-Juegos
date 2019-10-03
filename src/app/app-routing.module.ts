import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MemoryGameComponent } from './pages/juegos/memory-game/memory-game.component';
import { AdivinarNumeroGameComponent } from './pages/juegos/adivinar-numero-game/adivinar-numero-game.component';
import { AgilidadMentalGameComponent } from './pages/juegos/agilidad-mental-game/agilidad-mental-game.component';
import { AnagramaGameComponent } from './pages/juegos/anagrama-game/anagrama-game.component';
import { PptGameComponent } from './pages/juegos/ppt-game/ppt-game.component';
import { BoardComponent } from './pages/juegos/tateti-game/board/board.component';
import { PuntuacionComponent } from './pages/puntuacion/puntuacion/puntuacion.component';
import {
  redirectUnauthorizedTo,
  canActivate,
  redirectLoggedInTo,
  AngularFireAuthGuard,
} from '@angular/fire/auth-guard';
import { PerfilComponent } from './pages/perfil/perfil.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['home']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: PrincipalComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems },
  },
  {
    path: 'registro',
    component: RegistroComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems },
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'memoria',
        component: MemoryGameComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'adivinar-numero',
        component: AdivinarNumeroGameComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'agilidad-mental',
        component: AgilidadMentalGameComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'anagrama',
        component: AnagramaGameComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'piedra-papel-tijera',
        component: PptGameComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'ta-te-ti',
        component: BoardComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
    ],
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'puntuacion',
    component: PuntuacionComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
