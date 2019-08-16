import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProvidersComponent } from './providers/providers.component';
import { AlbumsContainerComponent } from './albums/components/albums-container.component';
import { PostsContainerComponent } from "./posts/components/posts-container.component";

const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent,
    children: [
      {
        path: '',
        redirectTo: 'albums',
        pathMatch: 'full'
      },
      {
        path: 'albums',
        component: AlbumsContainerComponent,
        data: {
          title: 'Albums',
          sourceName: 'ALBUMS'
        }
      },
      {
        path: 'posts',
        component: PostsContainerComponent,
        data: {
          title: 'Posts',
          sourceName: 'POSTS'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule {
}
