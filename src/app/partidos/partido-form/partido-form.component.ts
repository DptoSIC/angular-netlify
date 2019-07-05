import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Partido, Suceso } from '../modelo/partido';
import { GestorPartidosService } from '../servicio/gestor-partidos.service';

@Component({
  selector: 'app-partido-form',
  templateUrl: './partido-form.component.html',
  styles: []
})
export class PartidoFormComponent implements OnInit {
  partido: Partido;
  funcionClick = () => this.partido.local += '*';

  constructor(activateRoute: ActivatedRoute, private gestorPartidos: GestorPartidosService) {
    /*const id = activateRoute.snapshot.params.id;
    this.setPartidoPorId(id);*/

    activateRoute.params.subscribe(params => this.setPartidoPorId(params['id']));
  }

  ngOnInit() {
  }

  setPartidoPorId(id) {
    this.partido = this.gestorPartidos.getPartidos().find(x => x.id == id);
    // this.partido = this.mapearPartido(p);
  }

  onTarjetero(tarjeta: Suceso) {
    const sucs = this.partido.sucesos;
    sucs.splice(sucs.indexOf(tarjeta), 1);
    console.log('Eliminada tarjeta: ' + JSON.stringify(tarjeta));
  }

}
