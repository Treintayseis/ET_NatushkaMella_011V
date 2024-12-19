import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SesionPageRoutingModule } from './sesion-routing.module';

import { SesionPage } from './sesion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SesionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SesionPage]
})
export class SesionPageModule {}
