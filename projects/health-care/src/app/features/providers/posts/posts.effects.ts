import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/core.module';

import { State } from '../providers.state';
import * as providerAction from './posts.actions';
import { selectPostsState } from './posts.selectors';
import { PostsService } from './posts.service';
import { of } from "rxjs";

@Injectable()
export class PostsEffects {
  persistPosts = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          providerAction.actionPostsToggle,
          providerAction.actionPostSaveComment,
        ),
        withLatestFrom(this.store.pipe(select(selectPostsState))),
        map(([action, postsState]) =>
          this.localStorageService.setItem('PROVIDERS.' + postsState.sourceName, postsState.items.filter(item => !!item.favorite)))
      ),
    {dispatch: false}
  );
  retrievePosts = createEffect(() =>
    this.actions$.pipe(
      ofType(providerAction.actionPostsRetrieve),
      switchMap(action =>
        this.service.retrievePosts().pipe(
          filter(items => !!items && !!items.length),
          map(
            items => {
              const favoritePosts =  this.localStorageService.getItem('PROVIDERS.' + action.sourceName);
              if (!!favoritePosts) {
                favoritePosts.forEach(favoritePost => {
                    Object.assign(items.find(album => album.id === favoritePost.id), favoritePost)
                  }
                );
              }
              return providerAction.actionPostsRetrieveSuccess({items})
            }),
          catchError(error => of(providerAction.actionPostsRetrieveError({error})))
        )
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private localStorageService: LocalStorageService,
    private service: PostsService
  ) {
  }
}
