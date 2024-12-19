import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reestablecer',
  templateUrl: './reestablecer.page.html',
  styleUrls: ['./reestablecer.page.scss'],
})
export class ReestablecerPage implements OnInit {
  email: string = ''; // Variable para almacenar el email del usuario
  mensaje: string = ''; // Variable para mostrar un mensaje

  constructor(private recoveryService: AuthService) { }

  ngOnInit() { }

  // Método para recuperar la contraseña
  recuperarContrasenia() {
    this.recoveryService.recuperarContrasenia(this.email).subscribe(
      (usuarios) => {
        if (usuarios.length > 0) {
          // Si encontramos el usuario, mostramos la contraseña
          this.mensaje = `La contraseña de ${this.email} es: ${usuarios[0].password}`;
        } else {
          // Si no encontramos el usuario
          this.mensaje = 'No se encontró un usuario con ese email.';
        }
      },
      (error) => {
        // Manejo de errores
        console.error(error);
        this.mensaje = 'Hubo un error al recuperar la contraseña.';
      }
    );
  }
}

