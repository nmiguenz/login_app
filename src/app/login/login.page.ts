import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../class/user.class';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword = false;
  passwordToggleEye = "eye";

  constructor(private authSvc: AuthService, private alertCtrl: AlertController ,private route:Router) { }
  user : User = new User();
  ngOnInit() {
  }

  async onLogin(){
    try {
        const user = await this.authSvc.onLogin(this.user);
        if(user){
          this.handleBienvenida()
          console.log("El usuario se logueo OK");
          this.route.navigate(['/bienvenido']);
        }
    } catch (error) {
      console.dir(error)
      this.handleError(error.message)
    }   
  }
  
    cambiarOjo(){
      this.showPassword =!this.showPassword;
      if(this.passwordToggleEye === "eye")
        this.passwordToggleEye = "eye-off";
      else
        this.passwordToggleEye="eye";
    }
  
    clear(){
      this.user.email = null
      this.user.password= null
      this.showPassword = false;
    }
  
  
    async handleBienvenida() {
      const alert = await this.alertCtrl.create({
        header: 'Bienvenido nuevamente',
        message: this.user.email,
        buttons: ['Continuar']
      });
  
      await alert.present();
    }
  
    async handleError(cadena:string) {
      if(cadena === 'The email address is badly formatted.'){
        const alert = await this.alertCtrl.create({
          header: 'ERROR!',
          message: 'El correo electrónico no tiene el formato correcto',
          buttons: ['Continuar']
        });
        await alert.present();
      }
      else if(cadena === "The password is invalid or the user does not have a password."){
        const alert = await this.alertCtrl.create({
          header: 'ERROR!',
          message: 'La clave es erronea o no incluyó una',
          buttons: ['Continuar']
        });
        await alert.present();
      }
      else{
        const alert = await this.alertCtrl.create({
          header: 'ERROR!',
          message: 'No se encontró el usuario ingresado.',
          buttons: ['Continuar']
        });
        await alert.present();
      }
    }
  
}
