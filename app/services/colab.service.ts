import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colaborador, ColaboradorNuevo } from '../interfaces/colaborador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColabService {

  constructor(private httpclient: HttpClient) { }

  // Obtener un usuario por su nombre de usuario
  GetUserByUsername(usuario: string): Observable<Colaborador> {
    return this.httpclient.get<Colaborador>(`${environment.apiUrl}/colaboradores/?username=${usuario}`);
  }

  // Crear un nuevo usuario
  PostUsuario(newUsuario: ColaboradorNuevo): Observable<ColaboradorNuevo> {
    return this.httpclient.post<ColaboradorNuevo>(`${environment.apiUrl}/colaboradores`, newUsuario);
  }

  // Obtener todos los usuarios
  getUsuarios(): Observable<Colaborador[]> {
    return this.httpclient.get<Colaborador[]>(`${environment.apiUrl}/colaboradores`);
  }
  getUsuariosID(id:number):Observable<Colaborador>{
    return this.httpclient.get<Colaborador>(`${environment.apiUrl}/colaboradores/?id=${id}`);
  }

  // Actualizar los datos de un usuario, incluyendo la imagen
  updateUsuario(usuario: Colaborador): Observable<Colaborador> {
    return this.httpclient.put<Colaborador>(`${environment.apiUrl}/colaboradores/${usuario.id}`, usuario);
  }

  // Método para actualizar solo la imagen de un usuario
  updateImagenUsuario(id: string, imagenBase64: string): Observable<Colaborador> {
    // Enviamos solo la imagen del usuario al backend
    return this.httpclient.patch<Colaborador>(`${environment.apiUrl}/colaboradores/${id}`, { imagen: imagenBase64 });
  }
  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  getColaboradorId(id:number):Observable<Colaborador>{
    return this.httpclient.get<Colaborador>(`${environment.apiUrl}/colaboradores/?id=${id}`);
  }

  putColaborador(usuario:any):Observable<Colaborador>{
    return this.httpclient.put<Colaborador>(`${environment.apiUrl}/colaboradores/${usuario.id}`,usuario);
  }  
  
  recuperarContrasenia(email: string): Observable<any> {
    // Busca el usuario por el email
    return this.httpclient.get<any[]>(`${environment.apiUrl}/colaboradores/?email=${email}`);
  }
}
