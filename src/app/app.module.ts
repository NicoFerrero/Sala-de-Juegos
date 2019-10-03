import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

// Mis componentes
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablaComponent } from './pages/puntuacion/tabla/tabla.component';
import { PuntuacionComponent } from './pages/puntuacion/puntuacion/puntuacion.component';
import { UserService } from './services/user.service';

// Mis juegos
import { MemoryGameComponent } from './pages/juegos/memory-game/memory-game.component';
import { AdivinarNumeroGameComponent } from './pages/juegos/adivinar-numero-game/adivinar-numero-game.component';
import { AgilidadMentalGameComponent } from './pages/juegos/agilidad-mental-game/agilidad-mental-game.component';
import { AnagramaGameComponent } from './pages/juegos/anagrama-game/anagrama-game.component';
import { PptGameComponent } from './pages/juegos/ppt-game/ppt-game.component';
import { BoardComponent } from './pages/juegos/tateti-game/board/board.component';
import { SquareComponent } from './pages/juegos/tateti-game/square/square.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

// Angular material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

// Firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    NotFoundComponent,
    DashboardComponent,
    MemoryGameComponent,
    AdivinarNumeroGameComponent,
    AgilidadMentalGameComponent,
    AnagramaGameComponent,
    PptGameComponent,
    BoardComponent,
    SquareComponent,
    TablaComponent,
    PuntuacionComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [AngularFireAuthGuard, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
