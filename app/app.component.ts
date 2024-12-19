import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';

interface Menu{
  icon:string;
  redirecTo: string;
  name:string;
}
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  menu:Menu[]=[
    {
      icon:'person-circle-outline',
      redirecTo:'/myprofile',
      name:'Mi Perfil'
    },

    {
      icon:'close-circle',
      redirecTo:'',
      name:'Cerrar Sesion'
    },


    ]



  constructor() {}
}
