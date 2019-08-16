import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesComponent } from './favorites-component/favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  declarations: [FavoritesComponent],
  imports: [CommonModule, SharedModule, FavoritesRoutingModule]
})
export class FavoritesModule {
}
