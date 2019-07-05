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
    return this.sucesos.filter(s => s.class === 'Tarjeta');
  }

  getClaseTarjeta(tarjeta){
    return (tarjeta.tipoTarjeta === 1) ? 'bg-danger text-white' : 'bg-warning';
  }

}
