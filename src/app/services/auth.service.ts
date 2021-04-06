import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { ToastController } from '@ionic/angular';
import { User } from '../class/user.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;

  constructor(public afAuth:AngularFireAuth, public toastCtrl:ToastController) {
    afAuth.authState.subscribe(user => (this.isLogged = user))
   }

   // login
   async onLogin(user:User){
     try {
       return await this.afAuth.signInWithEmailAndPassword(user.email, user.password)
     } catch (error) {
       console.log('Error on login', error);
       this.handleError(error.message);
     }
   }

   // register
   async onRegister(user:User){
    try {
      return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    } catch (error) {
      console.log('Error on register user', error);
    }
   }
   
   async handleError(cadena:string) {
    if(cadena === "The email address is badly formatted."){
      console.log('Entro')
      const alert = await this.toastCtrl.create({
        message: 'El correo electrónico no tiene el formato correcto',
        duration:3000,
        position:'middle',
        color: 'warning'
      });
      await alert.present();
    }
    else if(cadena === "The password is invalid or the user does not have a password."){
      const alert = await this.toastCtrl.create({
        message: 'La clave es erronea o no incluyó una',
        duration:3000,
        position:'middle',
        color: 'warning'
      });
      await alert.present();
    }
    else{
      const alert = await this.toastCtrl.create({
        message: 'No se encontró el usuario ingresado.',
        duration:3000,
        position:'middle',
        color: 'warning'
      });
      await alert.present();
    }
  }
}
