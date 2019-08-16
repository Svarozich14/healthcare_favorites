import { createAction, props } from '@ngrx/store';

import { Album } from './albums.model';
import { HttpErrorResponse } from "@angular/common/http";

export const actionAlbumSaveComment = createAction(
  '[Albums] Save Comment',
  props<{ id: number, comment: string }>()
);

export const actionAlbumToggle = createAction(
  '[Albums] Toggle',
  props<{ id: number }>()
);

export const actionAlbumsRetrieve = createAction(
  '[Albums] Retrieve',
  props<{ sourceName: string }>()
);

export const actionAlbumsRetrieveSuccess = createAction(
  '[Albums] Retrieve Success',
  props<{ items: Album[] }>()
);

export const actionAlbumsRetrieveError = createAction(
  '[Albums] Retrieve Error',
  props<{ error: HttpErrorResponse }>()
);
