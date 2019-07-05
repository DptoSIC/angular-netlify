import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PartidosRoutingModule } from './partidos-routing.module';
import { PartidosComponent } from './partidos/partidos.component';
import { PartidoFormComponent } from './partido-form/partido-form.component';
import { ResumenComponent } from './resumen/resumen.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { GestorPartidosService } from './servicio/gestor-partidos.service';

@NgModule({
  declarations: [PartidosComponent, PartidoFormComponent, ResumenComponent, TarjetasComponent],
  imports: [
    CommonModule,
    PartidosRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GestorPartidosService]
})
export class PartidosModule { }
