import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { Iinscripcion } from '../interfaces/eventos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  inscripciones: Iinscripcion[] = [];  // Arreglo para inscripciones
  usuario: string = '';  // Variable para almacenar el nombre de usuario

  constructor(private apiService: ApicrudService, private router: Router) {}

  ngOnInit(): void {
    // Obtener el usuario actual desde sessionStorage
    this.usuario = sessionStorage.getItem('username') || '';  // Asegúrate de que el usuario esté disponible
    
    // Obtener las inscripciones desde la API
    this.apiService.getInscripciones().subscribe((data) => {
      if (Array.isArray(data)) {
        // Filtrar las inscripciones que corresponden al usuario actual
        this.inscripciones = data.filter(inscripcion => inscripcion.username=== this.usuario);
        console.log('Inscripciones filtradas:', this.inscripciones);
      } else {
        console.error('Error: la respuesta no es un arreglo', data);
      }
    }, (error) => {
      console.error('Error al obtener inscripciones:', error);
    });
  }

  atras() {
    this.router.navigate(['/tabs/tab2']);
  }

  buscarRegistro(inscripcion: Iinscripcion) {
    this.router.navigate(['/detalle-evento'], {
      queryParams: { inscripcion: JSON.stringify(inscripcion) }
    });
  }
}
