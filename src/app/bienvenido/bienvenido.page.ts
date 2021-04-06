import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../class/user.class';


@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage implements OnInit {

  constructor(private authSvr:AuthService, private route:Router, private afauth:AngularFireAuth) { }

  ngOnInit() {
  }

  async onLogout(){
    console.log('Log out!');
    this.afauth.signOut();
    this.route.navigate(['/login']);
    
  }
}
