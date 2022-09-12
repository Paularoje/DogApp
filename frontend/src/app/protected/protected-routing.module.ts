import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPaseoGrupComponent } from './agregar-paseo-grup/agregar-paseo-grup.component';
import { AgregarPaseoIndivComponent } from './agregar-paseo-indiv/agregar-paseo-indiv.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaseoGrupComponent } from './paseo-grup/paseo-grup.component';
import { PaseoIndivComponent } from './paseo-indiv/paseo-indiv.component';
import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { SoporteComponent } from './soporte/soporte.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,
  children:[]
  },
  {path:'paseo_individual',component: PaseoIndivComponent},
  {path:'agregar_paseo_indiv',component: AgregarPaseoIndivComponent},
  {path:'paseo_grupal',component: PaseoGrupComponent},
  {path:'agregar_paseo_grup',component: AgregarPaseoGrupComponent},
  {path:'seguimiento',component: SeguimientoComponent},
  {path:'soporte',component: SoporteComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
