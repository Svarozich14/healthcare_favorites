import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';

import { FEATURE_NAME, reducers } from './providers.state';
import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers/providers.component';
import { AlbumsContainerComponent } from './albums/components/albums-container.component';
import { AlbumsEffects } from './albums/albums.effects';
import { AlbumsService } from "./albums/albums.service";
import { PostsContainerComponent } from "./posts/components/posts-container.component";
import { PostsService } from "./posts/posts.service";
import { PostsEffects } from "./posts/posts.effects";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    SharedModule,
    ProvidersRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([
      AlbumsEffects,
      PostsEffects
    ])
  ],
  declarations: [
    ProvidersComponent,
    //   FavoritesComponent,
    AlbumsContainerComponent,
    PostsContainerComponent
  ],
  providers: [AlbumsService, PostsService]
})
export class ProvidersModule {
  constructor() {
  }
}
