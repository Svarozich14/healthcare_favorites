import { createAction, props } from '@ngrx/store';

import { Post } from './posts.model';
import { HttpErrorResponse } from "@angular/common/http";

export const actionPostSaveComment = createAction(
  '[Posts] Save Comment',
  props<{ id: number, comment: string }>()
);

export const actionPostsToggle = createAction(
  '[Posts] Toggle',
  props<{ id: number }>()
);

export const actionPostsRetrieve = createAction(
  '[Posts] Retrieve',
  props<{ sourceName: string }>()
);

export const actionPostsRetrieveSuccess = createAction(
  '[Posts] Retrieve Success',
  props<{ items: Post[] }>()
);

export const actionPostsRetrieveError = createAction(
  '[Posts] Retrieve Error',
  props<{ error: HttpErrorResponse }>()
);
