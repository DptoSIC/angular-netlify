import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partido, Suceso } from '../modelo/partido';
import { GestorPartidosService } from '../servicio/gestor-partidos.service';
import { Observable } from 'rxjs';
import { tap, share } from 'rxjs/operators';

@Component({
  selector: 'app-partido-form',
  templateUrl: './partido-form.component.html',
  styles: []
})
export class PartidoFormComponent implements OnInit {
  @Input() partido: Partido;
  funcionClick = () => this.partido.local += '*';
  resumido: boolean = false;
  partidoObservable$: Observable<Partido>;

  constructor(private activateRoute: ActivatedRoute, private gestorPartidos: GestorPartidosService) {
    /*const id = activateRoute.snapshot.params.id;
    this.setPartidoPorId(id);*/
  }

  ngOnInit() {
    this.resumido = this.partido != null;
    if (!this.resumido) {
      this.activateRoute.params.subscribe(params => this.setPartidoPorId(params['id']));
    }
  }

  setPartidoPorId(id) {
    // this.partido = this.gestorPartidos.getPartidos().find(x => x.id == id);
    // this.partido = this.mapearPartido(p);
    // this.gestorPartidos.getPartidoPorId(id).then(p => this.partido = p);
    this.partidoObservable$ = this.gestorPartidos.getPartidoObservable(id).pipe(
      tap((p) => console.log('Llega partido: ', p)),
      tap(p => this.partido = p),
      share()
    );
  }

  onTarjetero(tarjeta: Suceso) {
    const sucs = this.partido.sucesos;
    // sucs.splice(sucs.indexOf(tarjeta), 1);
    this.gestorPartidos.borrarTarjeta(tarjeta);
    console.log('Eliminada tarjeta: ' + JSON.stringify(tarjeta));
  }

  addTarjeta() {
    //this.gestorPartidos.addTarjeta(this.partido, this.partidoObservable);
      //.toPromise().then(() => this.partidoObservable.subscribe(() => console.log('Actualizando partidoObservable...')));
    //this.partidoObservable.subscribe(() => console.log('Actualizando partidoObservable...'));

    this.gestorPartidos.addTarjeta(this.partido)
      .subscribe(r => this.partidoObservable$.subscribe(() => console.log('Actualizando partidoObservable...')));
  }
}
