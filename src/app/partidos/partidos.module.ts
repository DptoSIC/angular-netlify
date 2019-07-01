import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PartidosRoutingModule } from './partidos-routing.module';
import { PartidosComponent } from './partidos/partidos.component';
import { PartidoFormComponent } from './partido-form/partido-form.component';
import { ResumenComponent } from './resumen/resumen.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';

@NgModule({
  declarations: [PartidosComponent, PartidoFormComponent, ResumenComponent, TarjetasComponent],
  imports: [
    CommonModule,
    PartidosRoutingModule,
    FormsModule
  ]
})
export class PartidosModule { }
