import { Component } from '@angular/core';
interface Menu{
  icon:string;
  redirecTo: string;
  name:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu:Menu[]=[
    {
      icon:'person-circle-outline',
      redirecTo:'/profile',
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
