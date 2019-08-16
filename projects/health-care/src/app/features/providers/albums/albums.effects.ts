import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/core.module';

import { State } from '../providers.state';
import * as providerAction from './albums.actions';
import { selectAlbumsState } from './albums.selectors';
import { AlbumsService } from './albums.service';
import { of } from "rxjs";

@Injectable()
export class AlbumsEffects {
  persistAlbums = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          providerAction.actionAlbumToggle,
          providerAction.actionAlbumSaveComment,
        ),
        withLatestFrom(this.store.pipe(select(selectAlbumsState))),
        map(([action, albumsState]) =>
          this.localStorageService.setItem('PROVIDERS.' + albumsState.sourceName, albumsState.items.filter(item => !!item.favorite)))
      ),
    {dispatch: false}
  );
  retrieveAlbums = createEffect(() =>
    this.actions$.pipe(
      ofType(providerAction.actionAlbumsRetrieve),
      switchMap(action =>
        this.service.retrieveAlbums().pipe(
          filter(items => !!items && !!items.length),
          map(
            items => {
              const favoriteAlbums = this.localStorageService.getItem('PROVIDERS.' + action.sourceName);
              if (!!favoriteAlbums) {
                favoriteAlbums.forEach(favoriteAlbum => {
                    Object.assign(items.find(album => album.id === favoriteAlbum.id), favoriteAlbum)
                  }
                );
              }
              return providerAction.actionAlbumsRetrieveSuccess({items})
            }),
          catchError(error => of(providerAction.actionAlbumsRetrieveError({error})))
        )
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private localStorageService: LocalStorageService,
    private service: AlbumsService
  ) {
  }
}
