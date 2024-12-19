import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IEventos } from '../interfaces/evento';
import { ApicrudService } from '../services/apicrud.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  evento: IEventos | undefined; 

  constructor(
    private router: Router, 
    private activated: ActivatedRoute,
    private api: ApicrudService, 
    private alert: AlertController
  ) { }

  ngOnInit(): void {
    this.activated.queryParams.subscribe(param => {
      if (param['eventos']) {
        try {

          this.evento = JSON.parse(param['eventos']);
          console.log('Evento recibido:', this.evento);
        } catch (error) {
          console.error('Error al parsear la inscripción:', error);
          this.evento = undefined;  
        }
      } else {
        console.log('El parámetro "evento" no está presente en la URL');
        this.evento = undefined;
      }
    });
  }


  update() {
    this.router.navigate(['/update'], {
      state: { evento: this.evento }  
    });
  }


  listar() {
    if (this.evento) {
      this.router.navigate(['/listar'], {
        queryParams: { eventoId: this.evento.id }  
      });
    }
  }

  async eliminarEvento() {
    const alert = await this.alert.create({
      header: 'El evento ha sido eliminado exitosamente',
      mode: 'ios',
      buttons: [
        {
          text: 'Volver',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/tab1']);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminar() {
    if (this.evento) {
      this.api.eliminarEvento(this.evento).subscribe(      
        response => {
          console.log('Evento eliminado:', response);
          this.eliminarEvento();  // Mostrar alerta de éxito
        },
        error => {
          console.error('Error al eliminar evento:', error);
        }
      );
    }
  }

  atras() {
    this.router.navigate(['/tabs/tab1']);
  }
}
