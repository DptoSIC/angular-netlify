import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-partido-form',
  templateUrl: './partido-form.component.html',
  styles: []
})
export class PartidoFormComponent implements OnInit {
  partido;

  constructor(activateRoute: ActivatedRoute) {
    let id = activateRoute.snapshot.params.id;//['id'];
    this.partido = environment.partidos.find(p => p.id == id);
    //this.partido = {id: id, local:'A', visitante:'b'};
   }

  ngOnInit() {
  }

}
