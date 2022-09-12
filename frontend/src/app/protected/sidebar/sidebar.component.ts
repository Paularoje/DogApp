import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { menuItem } from 'src/app/auth/interfaces/interfaces';

export interface menuItem{
  ruta:string;
  nombre:string
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router) { }

  isHomeRoute() {
    // if(this.router.url == this.router.url){
    //   this.router.navigateByUrl('#')
    // }
  }
  menuItems:menuItem[]=[
    {
      ruta:'/dashboard_walker/paseo_individual',
      nombre:'Paseo individual'
    },
    {
      ruta:'/dashboard_walker/paseo_grupal',
      nombre:'Paseo grupal'
    },
    {
      ruta:'/dashboard_walker/seguimiento',
      nombre:'Seguimiento'
    },
    {
      ruta:'/dashboard_walker/soporte',
      nombre:'Soporte '
    }
  ]
}

