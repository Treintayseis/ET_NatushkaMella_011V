import { Component, OnInit } from '@angular/core';
import { ColabService } from '../services/colab.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {
  email: string = ''; // Variable para almacenar el email del usuario
  mensaje: string = ''; // Variable para mostrar un mensaje

  constructor(private recoveryService: ColabService) { }

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
