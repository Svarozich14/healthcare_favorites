import { HttpErrorResponse } from "@angular/common/http";

export interface PostsState {
  sourceName: string;
  loading: boolean;
  items?: Post[];
  error?: HttpErrorResponse;
  sort?: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  favorite?: boolean;
  comment?: string;
}
