import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../class/user.class';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user : User = new User();
  constructor(private authSvc: AuthService, private route:Router) { }

  ngOnInit() {}
    
    async onRegister(){
      if(this.user.password == this.user.cpassword){
        const result = await this.authSvc.onRegister(this.user);
        if(result){
          console.log("El usuario se creó OK");
          this.route.navigate(['/login']);
        }
      }
    }

}
