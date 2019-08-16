import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EasterEggComponent } from './easter-egg/easter-egg.component';

const routes: Routes = [
  {
    path: '',
    component: EasterEggComponent,
    data: {title: 'Easter Egg'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EasterEggRoutingModule {
}
