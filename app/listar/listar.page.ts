import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicrudService } from '../services/apicrud.service';
import { Iinscripcion } from '../interfaces/evento';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  inscripcion: Iinscripcion[] = [];
  participantesEvento: Iinscripcion[] = [];
  eventoId: string | undefined = undefined; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private apicrud: ApicrudService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.eventoId = params['eventoId']; 
      this.obtenerParticipantesPorEvento(); 
    });

    this.apicrud.getInscripciones().subscribe(data => {
      this.inscripcion = data;
      this.obtenerParticipantesPorEvento(); 
    });
  }

  obtenerParticipantesPorEvento() {
    if (this.eventoId) {  
      this.participantesEvento = this.inscripcion.filter(inscripcion => {
        return String(inscripcion.eventId) === this.eventoId;  
      });
    }
  }
}