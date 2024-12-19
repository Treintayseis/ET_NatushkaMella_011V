import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, UserNuevo } from '../interfaces/users';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }


  getUsuarios(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

  GetAllUsers():Observable<Users[]>{
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

  GetUserByUsername(usuario:any):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?username=${usuario}`);
  }

  IsLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }

  PostUsuario(newUsuario:UserNuevo): Observable<UserNuevo>{
    return this.httpclient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }
  
  GetUsuarioId(id:number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }

  GetUsuarioById(id: number): Observable<Users> {
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/${id}`);
  }
  updateUsuario(usuario: Users): Observable<Users> {
    return this.httpclient.put<Users>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario);
  }

  // Método para actualizar solo la imagen de un usuario
  updateImagenUsuario(id: string, imagenBase64: string): Observable<Users> {
    // Enviamos solo la imagen del usuario al backend
    return this.httpclient.patch<Users>(`${environment.apiUrl}/usuarios/${id}`, { imagen: imagenBase64 });
  }

  recuperarContrasenia(email: string): Observable<any> {
    // Busca el usuario por el email
    return this.httpclient.get<any[]>(`${environment.apiUrl}/usuarios?email=${email}`);
  }
}
