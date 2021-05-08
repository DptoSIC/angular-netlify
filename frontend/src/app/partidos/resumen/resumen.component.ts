import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styles: []
})
export class ResumenComponent implements OnInit {
  partidos = environment.partidos;

  constructor() { }

  ngOnInit() {
  }

}
