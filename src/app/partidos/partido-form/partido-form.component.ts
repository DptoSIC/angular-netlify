import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

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
    const sucesos: Suceso[] = p.sucesos;
    const goles: Suceso[] = sucesos.filter(s => s.class === 'Gol');

    this.partido = {
      local: p.idLocal,
      visitante: p.idVisitante,
      golLocal: goles.filter(g => g.idParticipante === p.idLocal).length,
      golVisitante: goles.filter(g => g.idParticipante === p.idVisitante).length,
      fecha: p.timeStamp
    };

    //Podría hacerme los partidos dinámicamente cogiendo sólo el id
    //this.partido = {id: id, local:'A', visitante:'b'};
   }

  ngOnInit() {
  }

}



export interface Partido {
  local: string;
  visitante: string;
  golLocal: number;
  golVisitante: number;
  fecha: number;
  //getResultado: () => string;
}

export interface Suceso {
  class: string;
  idParticipante: string;
}
