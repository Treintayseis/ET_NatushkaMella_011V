import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { AuthService } from '../services/auth.service';
import { IEventos } from '../interfaces/eventos';
import { Users } from '../interfaces/users';
import { Iinscripcion } from '../interfaces/eventos';
import { AlertController } from '@ionic/angular'; // Importar AlertController


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  events: IEventos[] = [];
  usuario: Users | null = null;  // Aquí guardamos el usuario encontrado
  inscripcionStatus: string = ''; // Estado para mostrar el resultado de la inscripción

  constructor(
    private apiService: ApicrudService, 
    private authService: AuthService,
    private alertController: AlertController // Inyectar AlertController
  ) {}

  ngOnInit(): void {
    // Obtener los eventos de la API
    this.apiService.getEventos().subscribe((data) => {
      this.events = data;
    });

    // Obtener el nombre de usuario de la sesión
    const username = sessionStorage.getItem('username');
    
    // Si existe un nombre de usuario en la sesión, buscarlo
    if (username) {
      this.authService.getUsuarios().subscribe((usuarios: Users[]) => {
        // Buscar el usuario en la lista de usuarios
        this.usuario = usuarios.find(user => user.username === username) || null;

        // Si el usuario se encuentra, puedes hacer algo con sus datos
        console.log(this.usuario);
      });
    }
  }

  // Método para inscribir al usuario a un evento
  async inscribirEvento(event: IEventos): Promise<void> {
    if (this.usuario) {
      // Verificar si el usuario ya está inscrito en este evento
      this.apiService.getInscripciones().subscribe((inscripciones: Iinscripcion[]) => {
        const usuarioInscrito = inscripciones.find(inscripcion => inscripcion.username === this.usuario?.username && inscripcion.eventId === event.id);
        
        if (usuarioInscrito) {
          // Si el usuario ya está inscrito, mostrar una alerta
          this.mostrarAlerta('Ya estás inscrito', `No puedes inscribirte nuevamente al evento "${event.nombre}".`);
        } else {
          // Si no está inscrito, mostrar el alert de confirmación
          this.mostrarConfirmacion(event);
        }
      });
    } else {
      this.inscripcionStatus = 'No estás logueado.';
    }
  }

  // Método para mostrar la alerta de confirmación
  async mostrarConfirmacion(event: IEventos): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Estás seguro de inscribirte al evento "${event.nombre}" el día ${event.fecha}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.inscripcionStatus = 'La inscripción ha sido cancelada.';
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            const inscripcion: Iinscripcion = {
              username: this.usuario?.username || '',  
              email: this.usuario?.email || '',  
              eventId: event.id,
              eventName: event.nombre,
              eventDate: event.fecha,
            };

            this.apiService.inscribirUsuario(inscripcion).subscribe(
              (response) => {
                this.inscripcionStatus = `¡Te has inscrito al evento ${event.nombre} exitosamente!`;
                console.log(response);
              },
              (error) => {
                this.inscripcionStatus = `Error al inscribirte en el evento. Por favor, intenta nuevamente.`;
                console.error(error);
              }
            );
          }
        }
      ]
    });


    await alert.present();
  }

 
  async mostrarAlerta(titulo: string, mensaje: string): Promise<void> {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
  