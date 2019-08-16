import { createSelector } from '@ngrx/store';

import { ProvidersState, selectProviders } from '../providers.state';

export const selectPostsState = createSelector(
  selectProviders,
  (state: ProvidersState) => state.posts
);

export const selectPostsItems = createSelector(
  selectPostsState,
  state => state.items
);

export const selectPosts = createSelector(
  selectPostsItems,
  items =>  items
);
