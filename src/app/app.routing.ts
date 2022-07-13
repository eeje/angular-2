import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'playground',
    pathMatch: 'full'
},

{
  path: '**',
  redirectTo: 'playground'
},
];

export const ROUTING: ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES);