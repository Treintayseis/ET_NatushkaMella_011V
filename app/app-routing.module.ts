import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [ AutorizadoGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'sesion',
    loadChildren: () => import('./sesion/sesion.module').then( m => m.SesionPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'reestablecer',
    loadChildren: () => import('./reestablecer/reestablecer.module').then( m => m.ReestablecerPageModule),
    canActivate: [ AutorizadoGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [ AutorizadoGuard]
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./myprofile/myprofile.module').then( m => m.MyprofilePageModule),
    canActivate: [ AutorizadoGuard]
  },

  {
    path: 'detalle-evento',
    loadChildren: () => import('./detalle-evento/detalle-evento.module').then( m => m.DetalleEventoPageModule),
    canActivate: [ AutorizadoGuard]
  },

  {
    path: 'registro-evento',
    loadChildren: () => import('./registro-evento/registro-evento.module').then( m => m.RegistroEventoPageModule)
  },
  {
    path: 'eliminar',
    loadChildren: () => import('./eliminar/eliminar.module').then( m => m.EliminarPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
