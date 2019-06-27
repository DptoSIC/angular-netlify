import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartidosRoutingModule } from './partidos-routing.module';
import { PartidosComponent } from './partidos/partidos.component';
import { PartidoFormComponent } from './partido-form/partido-form.component';
import { ResumenComponent } from './resumen/resumen.component';

@NgModule({
  declarations: [PartidosComponent, PartidoFormComponent, ResumenComponent],
  imports: [
    CommonModule,
    PartidosRoutingModule
  ]
})
export class PartidosModule { }
