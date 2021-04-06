import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { User } from '../class/user.class';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword = false;
  passwordToggleEye = "eye-off";
  public formularioLogin : FormGroup;

  constructor(public formBuilder: FormBuilder, private authSvc: AuthService, private toastCtrl: ToastController,private route:Router) { }
  
  user : User = new User();
  
  ngOnInit() {
  }

  async onLogin(){
    try {
        const user = await this.authSvc.onLogin(this.user);
        if(user){
          this.handleBienvenida();
          this.route.navigate(['/bienvenido']);
          this.clear();
        }
    } catch (error) {
      console.log('Error login')
    }   
  }
  
    cambiarOjo(){
      this.showPassword =!this.showPassword;
      if(this.passwordToggleEye === "eye-off")
        this.passwordToggleEye = "eye";
      else
        this.passwordToggleEye="eye-off";
    }
  
    clear(){
      this.user.email = null
      this.user.password= null
      this.showPassword = false;
    }
  
    //Bienvenida y eror de login con TOASTCONTROLLER
    async handleBienvenida() {
      const alert = await this.toastCtrl.create({
        message: 'Bienvenido nuevamente '+this.user.email,
        duration:3000,
        position:'middle'
      });
      await alert.present();
    }
  
}
