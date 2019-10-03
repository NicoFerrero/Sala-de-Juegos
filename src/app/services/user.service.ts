import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  newUser: any;
  usersCollection: AngularFirestoreCollection<any>;
  users: Observable<any[]>;
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  aux: Subscription;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.usersCollection = this.afs.collection<any>('Users');
    this.users = this.usersCollection.valueChanges();
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

  login(user) {
    this.afAuth.auth
      .signInWithEmailAndPassword(user.email, user.pass)
      .catch(err => this.eventAuthError.next(err))
      .then(cred => {
        if (cred) {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  loginGoogle() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .catch(err => this.eventAuthError.next(err))
      .then(cred => {
        if (cred) {
          console.log(cred.user.uid);
          this.aux = this.getUser(cred.user.uid).subscribe(data => {
            if (data) {
              this.aux.unsubscribe();
              this.router.navigate(['/dashboard']);
            } else {
              this.afAuth.auth.currentUser.delete();
              this.logOut();
              this.router.navigate(['/home']);
              this.eventAuthError.next(
                'Esta cuenta de google no esta linkeada con ninguna cuenta registrada en el sistema',
              );
            }
          });
        }
      });
  }

  async register(user) {
    try {
      const cred = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.pass);
      this.newUser = user;
      console.log(cred);
      cred.user.updateProfile({
        // solo es necesario cuando se hacen register con email y pass
        displayName: user.nombre + ' ' + user.apellido,
      });
      this.insertUserData(cred).then(() => {
        console.log('exito');
      });
    } catch (error) {
      this.eventAuthError.next(error);
    }
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.afs.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      nombre: this.newUser.nombre,
      apellido: this.newUser.apellido,
      uid: userCredential.user.uid,
      agilidad_ari: 0,
      agilidad_ari_tot: 0,
      adivina_num: 0,
      adivina_num_tot: 0,
      anagrama: 0,
      anagrama_tot: 0,
      memoria: 0,
      memoria_tot: 0,
      ppt: 0,
      ppt_tot: 0,
      ttt: 0,
      ttt_tot: 0,
    });
  }

  isLoggedIn() {
    return this.afAuth.authState;
  }

  getUser(uid: string) {
    return this.afs.doc(`Users/${uid}`).valueChanges();
  }

  updateUser(user) {
    this.afs
      .collection('Users')
      .doc(user.uid)
      .set(user)
      .then(() => {
        console.log('exito');
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUsers() {
    return this.users;
  }

  currentUser() {
    return this.afAuth.auth.currentUser;
  }

  linkGoogle() {
    const provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.currentUser
      .linkWithPopup(provider)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

  unlinkGoogle(providerID) {
    this.afAuth.auth.currentUser
      .unlink(providerID)
      .then(() => console.log('Cuenta deslinkeada'))
      .catch(err => console.log(err));
  }
}
