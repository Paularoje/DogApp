import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario , Perro} from '../../auth/interfaces/interfaces';

@Component({
  selector: 'app-paseo-indiv',
  templateUrl: './paseo-indiv.component.html',
  styleUrls: ['./paseo-indiv.component.css'],
  styles: [
  ]
})
export class PaseoIndivComponent implements OnInit {
  perros: Perro[]=[];

  constructor(private authService:AuthService ) { }

  ngOnInit(): void {

    this.authService.listarPerro().subscribe(perros => this.perros = perros);

  }
  p(){

    console.log(Object.values(this.perros))
  }

}

