import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEventos } from '../interfaces/evento';
import { ApicrudService } from '../services/apicrud.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  evento: IEventos | null = null; 
  imagenTemp: string | ArrayBuffer | null = null;

  constructor(
    private router: Router,
    private apicrud: ApicrudService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['evento']) {
      this.evento = navigation.extras.state['evento']; 
      console.log('Evento recibido en Update:', this.evento);
    } else {
      console.error('No se pasó el evento al estado');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenTemp = reader.result;
        if (this.evento) {
          // Actualizar la imagen del evento
          this.evento.imagen = this.imagenTemp as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async actualizarEvento() {
    if (this.evento) {
      this.apicrud.updateEvento(this.evento).subscribe(
        async (updateEvento) => {
          console.log('Evento actualizado:', updateEvento);
          const alert = await this.alertController.create({
            header: 'Actualización Exitosa',
            message: 'El evento ha sido actualizado correctamente.',
            buttons: ['OK']
          });
          await alert.present();
        },
        async (error) => {
          console.error('Error al actualizar evento:', error);
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudo actualizar el evento.',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/tabs/tab1']);
  }
}
