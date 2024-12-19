import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleEventoPageRoutingModule } from './detalle-evento-routing.module';

import { DetalleEventoPage } from './detalle-evento.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    QRCodeModule,
    FormsModule,
    IonicModule,
    DetalleEventoPageRoutingModule
  ],
  declarations: [DetalleEventoPage]
})
export class DetalleEventoPageModule {}
