import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IEvento } from '../interfaces/evento';
import { ApicrudService } from '../services/apicrud.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  newEvento: IEvento = {
    nombre: "",
    imagen: "",  
    fecha: "",
    hora: "",
    lugar: "",
    descripcion: ""
  };

  constructor(
    private alertcontroller: AlertController,
    private router: Router,
    private apicrud: ApicrudService
  ) {}

  ngOnInit() {}

  // Método para convertir la imagen a base64 y almacenarla en 'newEvento'
  onImageSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = () => {
        this.newEvento.imagen = reader.result as string; // Convertimos la imagen a base64 y la guardamos en el objeto
        console.log("Imagen cargada como base64:", this.newEvento.imagen);
      };
      
      reader.readAsDataURL(file);  // Esto lee la imagen como una URL base64
    }
  }

  // Método para registrar el evento y mostrar la alerta
  async registrarEvento() {
    const alert = await this.alertcontroller.create({
      header: 'El evento ha sido agregado exitosamente',
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

  // Método para crear el evento
  async crearEvento() {
    // Aquí la imagen ya está en base64, junto con el resto de los datos
    this.apicrud.postEventos(this.newEvento).subscribe(
      response => {
        console.log('Evento creado:', response);
        this.registrarEvento();  // Mostrar alerta de éxito
      },
      error => {
        console.error('Error al crear el evento:', error);
      }
    );

    // Redirigir al usuario a la página de eventos
    this.router.navigateByUrl("/tabs/tab1");
  }
}
