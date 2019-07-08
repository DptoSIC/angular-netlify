import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Suceso } from '../modelo/partido';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styles: []
})
export class TarjetasComponent implements OnInit {

  @Input() sucesos: Suceso[];
  @Output() tarjetero = new EventEmitter<Suceso>();
  sucesoSeleccionado: Suceso;

  constructor() { }

  ngOnInit() {
  }

  seleccionarTarjeta(event: MouseEvent, suceso: Suceso) {
    this.sucesoSeleccionado = suceso;
    console.log('Seleccionada tarjeta: ' + JSON.stringify(suceso));
    if (event.ctrlKey) {
      this.quitarTarjeta();
    }
  }

  quitarTarjeta() {
    if (this.sucesoSeleccionado) {
      // this.sucesos.splice(this.sucesos.indexOf(this.sucesoSeleccionado), 1);
      this.tarjetero.emit(this.sucesoSeleccionado);
    } else {
      console.log('Primero hay que seleccionar una tarjeta');
    }
  }

  getTarjetas() {
    return this.sucesos.filter(s => s.tipo === 'Tarjeta');
  }

  getClaseTarjeta(tarjeta){
    return (tarjeta.tipoTarjeta === 'ROJA') ? 'bg-danger text-white' : 'bg-warning';
  }

  // Para el ruoterLink desde la Tarjeta
  calcularId(url) {
    return url.slice(url.lastIndexOf('/') + 1, url.length);
  }
  calcularLink(suceso: Suceso){
    return 'tarjetas/' + this.calcularId(suceso.url);
  }
}
