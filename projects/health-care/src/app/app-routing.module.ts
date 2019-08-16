import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'providers/albums',
    pathMatch: 'full'
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./features/providers/favorites/favorites.module').then(
        m => m.FavoritesModule
      )
  },
  {
    path: 'easter-egg',
    loadChildren: () =>
      import('./features/easter-egg/easter-egg.module').then(
        m => m.EasterEggModule
      )
  },
  {
    path: 'providers',
    loadChildren: () =>
      import('./features/providers/providers.module').then(m => m.ProvidersModule)
  },
  {
    path: '**',
    redirectTo: 'providers'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
