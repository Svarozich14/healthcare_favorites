import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from '../../core/core.state';

import { albumsReducer } from './albums/albums.reducer';
import { AlbumsState } from './albums/albums.model';
import { PostsState } from "./posts/posts.model";
import { postsReducer } from "./posts/posts.reducer";

export const FEATURE_NAME = 'providers';
export const selectProviders = createFeatureSelector<State, ProvidersState>(
  FEATURE_NAME
);
export const reducers: ActionReducerMap<ProvidersState> = {
  albums: albumsReducer,
  posts: postsReducer
};

export interface ProvidersState {
  albums: AlbumsState;
  posts: PostsState
}

export interface State extends AppState {
  providers: ProvidersState;
}
