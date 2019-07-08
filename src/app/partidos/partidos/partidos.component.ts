import { Component, OnInit } from '@angular/core';
import { Partido } from '../modelo/partido';
import { GestorPartidosService } from '../servicio/gestor-partidos.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styles: []
})
export class PartidosComponent implements OnInit {
  partidos: Partido[]; // = environment.partidosAPI;

  constructor(gestorPartidos: GestorPartidosService) {
    this.partidos = gestorPartidos.getPartidos();
  }

  ngOnInit() {
  }

}


