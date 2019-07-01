import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Partido } from '../modelo/partido';
import { Suceso } from '../modelo/suceso';

@Component({
  selector: 'app-partido-form',
  templateUrl: './partido-form.component.html',
  styles: []
})
export class PartidoFormComponent implements OnInit {
  partido: Partido;
  alertClick = () => this.partido.local += '*';

  constructor(activateRoute: ActivatedRoute) {
    const id = activateRoute.snapshot.params.id;
    const p = environment.partidos.find(x => x.id == id);
    this.partido = this.mapearPartido(p);

    //Podría hacerme los partidos dinámicamente cogiendo sólo el id
    //this.partido = {id: id, local:'A', visitante:'b'};
   }

  ngOnInit() {
  }

  mapearPartido(partidoApi){
    const sucesos: Suceso[] = partidoApi.sucesos;
    const goles: Suceso[] = sucesos.filter(s => s.class === 'Gol');

    const partido = new PartidoImpl();
    partido.local = partidoApi.idLocal;
    partido.visitante = partidoApi.idVisitante;
    partido.golLocal = goles.filter(g => g.idParticipante === partidoApi.idLocal).length;
    partido.golVisitante = goles.filter(g => g.idParticipante === partidoApi.idVisitante).length;
    partido.fecha = partidoApi.timeStamp;
    partido.sucesos = partidoApi.sucesos;
    
    //partido.getResultado = () => partido.golLocal + " - " + partido.golVisitante;

    return partido;
  }

  getTarjetas(partido: Partido){
    return partido.sucesos.filter(s => s.class === 'Tarjeta');
  }
}

class PartidoImpl implements Partido {
  local: string;
  visitante: string;
  golLocal: number;
  golVisitante: number;
  fecha: number;
  sucesos: Suceso[];

  constructor() {
  }

  getResultado() {
    return this.golLocal + " - " + this.golVisitante;
  }

  getTarjetas() {
    return this.sucesos.filter(s => s.class === 'Tarjeta');
  }
}
