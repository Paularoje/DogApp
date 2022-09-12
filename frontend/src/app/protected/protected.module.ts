import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AgregarPaseoGrupComponent } from './agregar-paseo-grup/agregar-paseo-grup.component';
import { AgregarPaseoIndivComponent } from './agregar-paseo-indiv/agregar-paseo-indiv.component';
import { PaseoGrupComponent } from './paseo-grup/paseo-grup.component';
import { PaseoIndivComponent } from './paseo-indiv/paseo-indiv.component';
import { SoporteComponent } from './soporte/soporte.component';
import { MapasComponent } from './mapas/mapas.component';
import { MapaMarcadorComponent } from './mapa-marcador/mapa-marcador.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { MapaSeguimientoComponent } from './mapa-seguimiento/mapa-seguimiento.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    SidebarComponent,
    AgregarPaseoGrupComponent,
    AgregarPaseoIndivComponent,
    PaseoGrupComponent,
    PaseoIndivComponent,
    SeguimientoComponent,
    SoporteComponent,
    MapasComponent,
    MapaMarcadorComponent,
    MapaSeguimientoComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule
  ],
  exports:[
    MenuComponent,
    DashboardComponent,
    SidebarComponent,
    PaseoGrupComponent,
    PaseoIndivComponent,
    MapasComponent,
    MapaMarcadorComponent
  ]
})
export class ProtectedModule { }
