import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  funcionClick = () => this.partido.local += '*';

  constructor(activateRoute: ActivatedRoute) {
    // const id = activateRoute.snapshot.params.id;
    // const p = environment.partidos.find(x => x.id == id);
    // this.partido = this.mapearPartido(p);
    activateRoute.params.subscribe(params => this.setPartidoPorId(params['id']));

    // Podría hacerme los partidos dinámicamente cogiendo sólo el id
    // this.partido = {id: id, local:'A', visitante:'b'};
  }

  ngOnInit() {
  }

  mapearPartido(partidoApi: any){
    // const sucesos: Suceso[] = partidoApi.sucesos;
    // const goles: Suceso[] = sucesos.filter(s => s.class === 'Gol');

    const partido = new PartidoImpl();
    partido.local = partidoApi.idLocal;
    partido.visitante = partidoApi.idVisitante;
    // partido.golLocal = goles.filter(g => g.idParticipante === partidoApi.idLocal).length;
    // partido.golVisitante = goles.filter(g => g.idParticipante === partidoApi.idVisitante).length;
    partido.fecha = partidoApi.timeStamp;
    partido.sucesos = partidoApi.sucesos;

    // partido.getResultado = () => partido.golLocal + " - " + partido.golVisitante;

    return partido;
  }

  setPartidoPorId(id){
    const p = environment.partidos.find(x => x.id == id);
    this.partido = this.mapearPartido(p);
  }

  onTarjetero(tarjeta: Suceso){
    const sucs = this.partido.sucesos;
    sucs.splice(sucs.indexOf(tarjeta), 1);
    console.log('Eliminada tarjeta: ' + JSON.stringify(tarjeta));
  }
}

class PartidoImpl implements Partido {
  local: string;
  visitante: string;
  // golLocal: number;
  // golVisitante: number;
  fecha: number;
  sucesos: Suceso[];

  constructor() {
  }

  golesLocal() {
    return this.golesParticipante(this.local);
  }
  golesVisitante() {
    return this.golesParticipante(this.visitante);
  }

  getResultado() {
    // return this.golLocal + ' - ' + this.golVisitante;
    return this.golesLocal() + ' - ' + this.golesVisitante();
  }

  getTarjetas() {
    return this.sucesos.filter(s => s.class === 'Tarjeta');
  }

  getGoles(){
    return this.sucesos.filter(s => s.class === 'Gol');
  }

  golesParticipante(participante) {
    return this.getGoles().filter(g => g.idParticipante === participante).length;
  }
}
