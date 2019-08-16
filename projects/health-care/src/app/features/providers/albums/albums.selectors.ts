import { createSelector } from '@ngrx/store';

import { ProvidersState, selectProviders } from '../providers.state';

export const selectAlbumsState = createSelector(
  selectProviders,
  (state: ProvidersState) => state.albums
);

export const selectAlbumsItems = createSelector(
  selectAlbumsState,
  state => state.items
);

export const selectAlbums = createSelector(
  selectAlbumsItems,
  items => items
);
