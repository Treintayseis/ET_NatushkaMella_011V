import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';
import { Iinscripcion } from '../interfaces/eventos';

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.page.html',
  styleUrls: ['./detalle-evento.page.scss'],
})
export class DetalleEventoPage implements OnInit {
  opinion: string = '';
  id: any;
  usuario: any;
  qrdata: string;
  inscripcion: Iinscripcion | undefined;  // Puede ser undefined al principio

  constructor(
    private activated: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private apicrud: ApicrudService
  ) {
    this.qrdata = '';
    this.usuario = sessionStorage.getItem('username');
    
    // Verificar el parámetro 'inscripcion' recibido
    this.activated.queryParams.subscribe(param => {
      console.log('Parametros recibidos:', param);  // Imprimir los parámetros recibidos

      if (param['inscripcion']) {
        try {
          // Asegurarse de que el parámetro está bien formateado
          this.inscripcion = JSON.parse(param['inscripcion']);
          console.log('Inscripción recibida:', this.inscripcion);
        } catch (error) {
          console.error('Error al parsear la inscripción:', error);
          this.inscripcion = undefined;  // Establecer a undefined si el parseo falla
        }
      } else {
        console.log('El parámetro "inscripcion" no está presente en la URL');
        this.inscripcion = undefined;
      }
    });
  }

  ngOnInit(): void {}

  volver() {
    this.router.navigate(['/tabs/tab3']);
  }

  generarQr() {
    if (this.inscripcion && this.usuario) {
      this.qrdata = JSON.stringify(this.inscripcion.eventName) + this.usuario;  // Concatenar los datos
      console.log(this.qrdata);
    } else {
      console.log('Faltan datos para generar el QR');
    }
  }

  // Función para mostrar la confirmación antes de eliminar
  async confirmarEliminacion(inscripcion: Iinscripcion) {
    const alert = await this.alertController.create({
      header: 'Confirmación de Eliminación',
      message: `¿Estás seguro de que deseas eliminar tu inscripción al evento "${inscripcion.eventName}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            // Al confirmar, llamamos a la función de eliminación
            this.elimina(inscripcion);
          }
        }
      ]
    });

    // Presentamos la alerta de confirmación
    await alert.present();
  }

  // Función para eliminar la inscripción
  elimina(inscripcion: Iinscripcion) {
    this.apicrud.deleteInscripcion(inscripcion).subscribe({
      next: async (response) => {
        // Si la eliminación es exitosa, mostramos la alerta de éxito
        const successAlert = await this.alertController.create({
          header: 'Eliminación exitosa',
          message: `Tu inscripción al evento "${inscripcion.eventName}" ha sido eliminada correctamente.`,
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.router.navigate(['/tabs/tab1']); // Redirigir a la página de eventos después de la eliminación
              }
            }
          ]
        });

        await successAlert.present();
      },
      error: async (error) => {
        // Si ocurre un error, mostramos la alerta de error
        const errorAlert = await this.alertController.create({
          header: 'Error',
          message: `Hubo un error al intentar eliminar la inscripción. Por favor, intenta nuevamente.`,
          buttons: ['Aceptar']
        });

        await errorAlert.present();
        console.error(error);
      }
    });
  }
  enviarOpinion() {
    if (this.opinion.trim() === '') {
      alert('Por favor, escribe tu opinión antes de enviarla.');
    } else {
      // Aquí puedes manejar la lógica de envío de la opinión
      console.log('Opinión enviada:', this.opinion);
      // Reseteamos el área de texto después de enviar
      this.opinion = '';
      alert('¡Gracias por tu opinión!');
    }
  }
}
