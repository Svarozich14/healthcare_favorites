import { HttpErrorResponse } from "@angular/common/http";

export interface AlbumsState {
  sourceName: string;
  loading: boolean;
  items?: Album[];
  error?: HttpErrorResponse;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
  favorite?: boolean;
  comment?: string;
}
