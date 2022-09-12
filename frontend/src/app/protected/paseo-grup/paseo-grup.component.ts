import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario , Perro} from '../../auth/interfaces/interfaces';

@Component({
  selector: 'app-paseo-grup',
  templateUrl: './paseo-grup.component.html',
  styleUrls: ['./paseo-grup.component.css'],
  styles: [
  ]
})
export class PaseoGrupComponent implements OnInit {

  perros: Perro[]=[];

  constructor(private authService:AuthService ) { }

  ngOnInit(): void {

    this.authService.listarPerro().subscribe(perros => this.perros = perros);

  }
  p(){

    console.log(Object.values(this.perros))
  }

}
