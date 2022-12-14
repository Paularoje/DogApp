import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProtectedUserRoutingModule } from './protected_user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MapasComponent } from './mapas/mapas.component';
import { MisPerrosComponent } from './mis-perros/mis-perros.component';
import { RouterModule } from '@angular/router';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { SoporteComponent } from './soporte/soporte.component';
import { HistorialComponent } from './historial/historial.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { EditarPerroComponent } from './editar-perro/editar-perro.component';
import { AgregarPerroComponent } from './agregar-perro/agregar-perro.component';
import { MapaMarcadorComponent } from './mapa-marcador/mapa-marcador.component';
import { PerroTarjetaComponent } from './perro-tarjeta/perro-tarjeta.component';
import { MapaSeguimientoComponent } from './mapa-seguimiento/mapa-seguimiento.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    SidebarComponent,
    MapasComponent,
    MisPerrosComponent,
    AgregarPerroComponent,
    SeguimientoComponent,
    SoporteComponent,
    HistorialComponent,
    SolicitudComponent,
    EditarPerroComponent,
    MapaMarcadorComponent,
    PerroTarjetaComponent,
    MapaSeguimientoComponent
  ],
  imports: [
    CommonModule,
    ProtectedUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    MenuComponent,
    DashboardComponent,
    SidebarComponent,
    MapasComponent,
    MisPerrosComponent

  ]
})
export class ProtectedUserModule { }
