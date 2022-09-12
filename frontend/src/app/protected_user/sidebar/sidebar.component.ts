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
      ruta:'/dashboard_user/solicitud',
      nombre:'Solicitud Servicio'
    },
    {
      ruta:'/dashboard_user/seguimiento',
      nombre:'Seguimiento a Servicio'
    },
    {
      ruta:'/dashboard_user/misPerros',
      nombre:'Mis Mascotas'
    },
    {
      ruta:'/dashboard_user/historial',
      nombre:'Historial'
    },
    {
      ruta:'/dashboard_user/soporte',
      nombre:'Soporte'
    }

  ]
}
