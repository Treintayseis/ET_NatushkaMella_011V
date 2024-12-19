import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';
import { IEventos } from '../interfaces/evento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  events: IEventos[] = [];
  usuario: any;

  constructor(
    private menucontroller: MenuController,
    private apicrud: ApicrudService,
    private router: Router
  ) {}

  ngOnInit(): void {      
    this.usuario = sessionStorage.getItem('username');
    console.log(this.usuario);

    // Obtener los eventos de la API
    this.apicrud.getEventos().subscribe((data) => {
      this.events = data;
    });
  }

  mostrarMenu() {
    this.menucontroller.enable(true);
    this.menucontroller.open('first');
  }

  // Función para navegar a la página de detalles
  buscarRegistro(eventos: IEventos) {
    this.router.navigate(['/detalle'], {
      queryParams: { eventos: JSON.stringify(eventos) }
    });
  }
  

  
  
}
