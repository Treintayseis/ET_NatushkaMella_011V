import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private alertcontroller:AlertController,
              private router: Router) { }

  ngOnInit() {
  }

  session(){
    this.router.navigate(['/sesion']);

  }

  register(){
    this.router.navigate(['/registro']);

  }

}
