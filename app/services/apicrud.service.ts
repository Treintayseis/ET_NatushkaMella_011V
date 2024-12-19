
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IEventos, Iinscripcion  } from '../interfaces/eventos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApicrudService {
  private registeredEvents: IEventos[] = [];

  constructor(private httpclient: HttpClient) {}
  
  getEventos(): Observable<IEventos[]> {
    return this.httpclient.get<IEventos[]>(`${environment.apiUrl}/eventos`);
  }


  inscribirUsuario(inscripcion: Iinscripcion): Observable<any> {
    return this.httpclient.post(`${environment.apiUrl}/inscripcion`, inscripcion);  // Ajusta según tu API
  }

  getInscripciones(): Observable<Iinscripcion[]> {
    return this.httpclient.get<Iinscripcion[]>(`${environment.apiUrl}/inscripcion`);  // Ajusta según tu API
  }

//(nombre del json)
  deleteInscripcion(inscripcion:any):Observable<Iinscripcion>{
    return this.httpclient.delete<Iinscripcion>(`${environment.apiUrl}/inscripcion/${inscripcion.id}`);
  }
}
