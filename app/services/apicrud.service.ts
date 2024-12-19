
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IEvento, IEventos, Iinscripcion } from '../interfaces/evento';
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

  postEventos(newEvento:IEvento):Observable<IEvento>{
    return this.httpclient.post<IEvento>(`${environment.apiUrl}/eventos`,newEvento);
  }

  getEventoId(id:number):Observable<IEventos>{
    return this.httpclient.get<IEventos>(`${environment.apiUrl}/eventos/?id=${id}`);
  
  }
   // Actualizar evento
   actualizarEvento(evento: IEventos): Observable<any> {
    return this.httpclient.put(`${environment.apiUrl}/${evento.id}`, evento);
  }

  // Eliminar evento
  eliminarEvento(evento: any): Observable<IEventos> {
    return this.httpclient.delete<IEventos>(`${environment.apiUrl}/eventos/${evento.id}`);
  }

  updateEvento(evento: IEventos): Observable<IEventos> {
    return this.httpclient.put<IEventos>(`${environment.apiUrl}/eventos/${evento.id}`, evento);
  }

  // Método para actualizar solo la imagen de un usuario
  updateImagenEvento(id: string, imagenBase64: string): Observable<IEventos> {
    // Enviamos solo la imagen del usuario al backend
    return this.httpclient.patch<IEventos>(`${environment.apiUrl}/eventos/${id}`, { imagen: imagenBase64 });
  }


  putEvento(evento:any):Observable<IEventos>{
    return this.httpclient.put<IEventos>(`${environment.apiUrl}/eventos/${evento.id}`,evento);
  }
  inscribirUsuario(inscripcion: Iinscripcion): Observable<any> {
    return this.httpclient.post(`${environment.apiUrl}/inscripcion`, inscripcion);  // Ajusta según tu API
  }

  getInscripciones(): Observable<Iinscripcion[]> {
    return this.httpclient.get<Iinscripcion[]>(`${environment.apiUrl}/inscripcion`);  // Ajusta según tu API
  }
}