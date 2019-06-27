import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartidosComponent } from './partidos/partidos.component';
import { PartidoFormComponent } from './partido-form/partido-form.component';
import { ResumenComponent } from './resumen/resumen.component';

const routes: Routes = [
  {
    path: '',
    component: PartidosComponent,
    children: [
      {
      path: 'resumen',
      component: ResumenComponent
      },
      {
      path: ':id',
      component: PartidoFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartidosRoutingModule { }
