import { Action, createReducer, on } from '@ngrx/store';
import * as postAction from './posts.actions';
import { Post, PostsState } from './posts.model';

export const initialState: PostsState = {
  sourceName: 'POSTS',
  loading: false,
  items: [],
};

const reducer = createReducer(
  initialState,
  on(postAction.actionPostsRetrieve, (state, {sourceName}) => ({
    ...state,
    loading: true,
    error: null,
    sourceName
  })),
  on(postAction.actionPostsRetrieveSuccess, (state, {items}) => {
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
  on(postAction.actionPostsRetrieveError, (state, {error}) => ({
    ...state,
    loading: false,
    items: [],
    error
  })),
  on(postAction.actionPostsToggle, (state, post) => ({
    ...state,
    items: state.items.map((item: Post) =>
      item.id === post.id ? {...item, favorite: !item.favorite, comment: ''} : item
    ),
  })),
  on(postAction.actionPostSaveComment, (state, post) => ({
    ...state,
    items: state.items.map((item: Post) =>
      item.id === post.id ? {...item, comment: post.comment} : item
    ),
  })),
);

export function postsReducer(
  state: PostsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
