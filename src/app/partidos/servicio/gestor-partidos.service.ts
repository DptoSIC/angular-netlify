import { Injectable } from '@angular/core';
import { Suceso, Partido } from '../modelo/partido';
import { GestorPartidos } from './gestor-partidos';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestorPartidosService implements GestorPartidos{
  host = 'http://localhost:8081';
  url = `${this.host}/partidoHbms?page=0&size=5`;
  partidos: Partido[] = [];

  constructor(http: HttpClient) {
    console.log('Construyendo Gestor...');
    http.get<any>(this.url)
      .subscribe(r => this.partidos.push(...this.extraerPartidos(r)), e => console.error(e));
  }

  extraerPartidos(respuestaApi: any): Partido[] {
    const partidos = [];
    respuestaApi._embedded.partidoHbms.forEach(p => {
        const pMapeado: Partido = this.mapearPartido(p.content);
        const href = p._links.self.href;
        pMapeado.id = href.slice(href.lastIndexOf('/') + 1, href.length);
        // console.log(p);
        console.log(pMapeado);
        partidos.push(pMapeado);
      });
    return partidos;
  }

  getPartidos(): Partido[] {
    return this.partidos;
  }

  mapearPartido(partidoApi) {
    const partido = new PartidoImpl();
    partido.local = partidoApi.idLocal;
    partido.visitante = partidoApi.idVisitante;
    partido.fecha = partidoApi.fecha;
    partido.sucesos = partidoApi.sucesos;

    return partido;
  }
}

class PartidoImpl implements Partido {
  id: string;
  local: string;
  visitante: string;
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

  getGoles(){
    return this.sucesos.filter(s => s.class === 'Gol');
  }

  golesParticipante(participante) {
    return this.getGoles().filter(g => g.idParticipante === participante).length;
  }

  getResultado() {
    return this.golesLocal() + ' - ' + this.golesVisitante();
  }

  getTarjetas() {
    return this.sucesos.filter(s => s.class === 'Tarjeta');
  }

}
