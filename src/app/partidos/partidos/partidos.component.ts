import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styles: []
})
export class PartidosComponent implements OnInit {
  partidos = environment.partidos;

  constructor() { }

  ngOnInit() {
  }

}
