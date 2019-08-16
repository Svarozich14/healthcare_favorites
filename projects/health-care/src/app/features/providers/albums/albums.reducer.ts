import { Action, createReducer, on } from '@ngrx/store';
import * as albumAction from './albums.actions';
import { Album, AlbumsState } from './albums.model';

export const initialState: AlbumsState = {
  sourceName: 'ALBUMS',
  loading: false,
  items: []
};

const reducer = createReducer(
  initialState,
  on(albumAction.actionAlbumsRetrieve, (state, {sourceName}) => ({
    ...state,
    loading: true,
    error: null,
    sourceName
  })),
  on(albumAction.actionAlbumsRetrieveSuccess, (state, {items}) => {
    state.items.forEach(stateItem => {
      const favoriteItem = items.find(item => item.id === stateItem.id);
      if (!!favoriteItem) {
        Object.assign(favoriteItem, stateItem);
      }
    });
    return ({
      ...state,
      loading: false,
      items,
      error: null,
    })
  }),
  on(albumAction.actionAlbumsRetrieveError, (state, {error}) => ({
    ...state,
    loading: false,
    items: [],
    error
  })),
  on(albumAction.actionAlbumToggle, (state, album) => ({
    ...state,
    items: state.items.map((item: Album) =>
      item.id === album.id ? {...item, favorite: !item.favorite, comment: ''} : item
    ),
  })),
  on(albumAction.actionAlbumSaveComment, (state, album) => ({
    ...state,
    items: state.items.map((item: Album) =>
      item.id === album.id ? {...item, comment: album.comment} : item
    ),
  })),
);

export function albumsReducer(
  state: AlbumsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
