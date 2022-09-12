import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenUserGuard } from './guards/validar-token-user.guard';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard_walker',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivate: [ ValidarTokenGuard ],
    canLoad: [ ValidarTokenGuard ]
  },
  {
    path: 'dashboard_user',
    loadChildren: () => import('./protected_user/protected_user.module').then(m => m.ProtectedUserModule),
    canActivate: [ ValidarTokenUserGuard ],
    canLoad: [ ValidarTokenUserGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
