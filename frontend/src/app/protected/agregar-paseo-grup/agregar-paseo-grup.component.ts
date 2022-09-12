import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-paseo-grup',
  templateUrl: './agregar-paseo-grup.component.html',
  styles: [
  ]
})
export class AgregarPaseoGrupComponent implements OnInit {
  minutos:number=0;
  fechaHora:Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  //contador de tiempo
  time(){
    this.fechaHora = new Date();
    this.minutos = this.fechaHora.getMinutes();
    if (this.minutos >= 5){
    }
  }

}
