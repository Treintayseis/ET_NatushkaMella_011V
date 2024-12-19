import { Component, OnInit } from '@angular/core';
import { Users } from '../interfaces/users';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {

  usuario: Users | null = null;
  imagenTemp: string | ArrayBuffer | null = null;  // Para almacenar la imagen temporalmente
  passwordVisible: boolean = false;  // Para alternar la visibilidad de la contraseña



  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    const username = sessionStorage.getItem('username');

    if (username) {
      this.authService.getUsuarios().subscribe((usuarios: Users[]) => {
        this.usuario = usuarios.find(user => user.username === username) || null;

        if (this.usuario) {
          // Recuperar imagen de perfil guardada en localStorage, si existe
          const usuarioGuardado = JSON.parse(localStorage.getItem(`usuario_${this.usuario.id}`) || '{}');
          if (usuarioGuardado && usuarioGuardado.imagen) {
            this.usuario.imagen = usuarioGuardado.imagen;
          }
        }
      });
    }
  }

  // Manejo del cambio de imagen
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenTemp = reader.result;
        if (this.usuario) {
          // Actualizar imagen de perfil en localStorage y backend
          this.usuario.imagen = this.imagenTemp as string;
          localStorage.setItem(`imagen_${this.usuario.id}`, this.imagenTemp as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  //Ver contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async actualizarUsuario() {
    if (this.usuario) {
      this.authService.updateUsuario(this.usuario).subscribe(
        async (updatedUser) => {
          // Actualización exitosa
          console.log('Perfil actualizado', updatedUser);
          const alert = await this.alertController.create({
            header: 'Actualizacion Exitosa',
            message: 'Perfil actualizado con éxito',
            buttons: ['OK']
          });
          await alert.present();
        },
        async (error) => {
          // Error al actualizar el perfil
          console.error('Error al actualizar el perfil', error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Error al actualizar el perfil',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    }
  }


  // Función para navegar atrás
  volver() {
    this.router.navigate(['/tabs/tab1']);
  }
}
