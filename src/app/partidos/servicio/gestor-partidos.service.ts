import { Injectable } from '@angular/core';
import { Suceso, Partido, Tarjeta } from '../modelo/partido';
import { GestorPartidos } from './gestor-partidos';
import { HttpClient } from '@angular/common/http';
import { map, share, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestorPartidosService implements GestorPartidos{
  host = 'http://localhost:8081';
  url = `${this.host}/partidos?page=0&size=5`;
  partidos: Partido[] = [];
  partidos$: Observable<Partido[]>;

  constructor(private http: HttpClient) {
    console.log('Construyendo Gestor...');
    http.get<any>(this.url)
      .subscribe(r => this.partidos.push(...this.extraerPartidos(r)), e => console.error(e));
  }

  getPartidos(): Partido[] {
    return this.partidos;
  }

  getPartidoPorId(id): Promise<Partido> {
    // return this.http.get<any>(`${this.host}/partidos/` + id).pipe(map(r => this.extraerPartido(r))).toPromise();
    return this.getPartidoObservable(id).toPromise();
  }

  getPartidoObservable(id): Observable<Partido> {
    return this.http.get<any>(`${this.host}/partidos/` + id).pipe(map(r => this.extraerPartido(r)), share());
  }

  extraerPartidos(respuestaApi: any): Partido[] {
    const partidos: Partido[] = [];
    respuestaApi._embedded.partidos.forEach(p => {
        const pMapeado = this.extraerPartido(p);
        // console.log(p);
        // console.log(pMapeado);
        partidos.push(pMapeado);
      });
    return partidos;
  }

  extraerPartido(partidoDesdeAPI): Partido {
    const pe = this.mapearPartido(partidoDesdeAPI);
    const url = partidoDesdeAPI._links.self.href;
    // console.log(url);
    pe.id = url.slice(url.lastIndexOf('/') + 1, url.length);
    const sucesos: Suceso[] = [];
    this.http.get<any>(`${this.host}/sucesos/search/sucesos-partido?partido=${this.host}/partidos/` + pe.id)
      .subscribe(r => {
        let arraySucesos = r._embedded.goles;
        if (arraySucesos) {
          sucesos.push(...this.mapearSucesos(arraySucesos));
        }
        arraySucesos = r._embedded.tarjetas;
        if (arraySucesos) {
          sucesos.push(...this.mapearSucesos(arraySucesos));
        }
      });
    pe.sucesos = sucesos;

    return pe;
  }

  mapearPartido(partidoApi) {
    const partido = new PartidoImpl();
    partido.local = partidoApi.idLocal;
    partido.visitante = partidoApi.idVisitante;
    partido.fecha = partidoApi.timeStamp;
    partido.sucesos = partidoApi.sucesos;

    return partido;
  }

  mapearSuceso(sucesoAPI): Suceso {
    const suceso: Suceso = {  tipo: sucesoAPI.tipo,
              idParticipante: sucesoAPI.idParticipante,
              url: sucesoAPI._links.self.href };
    if (suceso.tipo === 'Tarjeta') {
      const tarjeta = suceso as Tarjeta;
      tarjeta.tipoTarjeta = sucesoAPI.tipoTarjeta;
    }
    // console.log(suceso);
    return suceso;
  }

  mapearSucesos(sucesosAPI: any[]): Suceso[] {
    const sucesos: Suceso[] = [];
    sucesosAPI.forEach(s => sucesos.push(this.mapearSuceso(s)));
    return sucesos;
  }

  borrarTarjeta(tarjeta: Suceso) {
    this.http.delete(tarjeta.url).subscribe(r => console.log('Se ha borrado ' + JSON.stringify(tarjeta)));
  }

  addTarjeta(partido: Partido) {// }, observable: Observable<Partido>){
  const tarjetaNueva = {  timeStamp: new Date().getMilliseconds(),
                          idParticipante: partido.visitante,
                          actor: 'Sancionado',
                          tipo: 'Tarjeta',

                          tipoTarjeta: 'AMARILLA',
                          partido: `${this.host}/partidos/${partido.id}`
                        };
  /*const observable = this.http.post( `${this.host}/tarjetas`, tarjetaNueva).pipe(share());
  observable.subscribe(r => console.log('Se ha dado de alta ' + tarjetaNueva + ' => ' + r));
  return observable;*/

  /*this.http.post( `${this.host}/tarjetas`, tarjetaNueva)//.pipe(share())
    .subscribe(r => {
      console.log('Se ha dado de alta ' + tarjetaNueva + ' => ' + r);
      observable.subscribe(() => console.log('Actualizando partidoObservable...'));
    });
  }*/

  const observable = this.http.post( `${this.host}/tarjetas`, tarjetaNueva).pipe(
    tap(r => {
      console.log('Se ha dado de alta ' + tarjetaNueva + ' => ' + r);
      //observable.subscribe(() => console.log('Actualizando partidoObservable...'));
    }),
    share());

  return observable;
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
    return this.sucesos.filter(s => s.tipo === 'Gol');
  }

  golesParticipante(participante) {
    return this.getGoles().filter(g => g.idParticipante === participante).length;
  }

  getResultado() {
    return this.golesLocal() + ' - ' + this.golesVisitante();
  }

  getTarjetas() {
    return this.sucesos.filter(s => s.tipo === 'Tarjeta');
  }

}
