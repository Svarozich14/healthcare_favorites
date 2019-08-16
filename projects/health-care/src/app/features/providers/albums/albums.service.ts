import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Album } from './albums.model';

@Injectable()
export class AlbumsService {
  constructor(private http: HttpClient) {
  }

  retrieveAlbums(): Observable<Album[]> {
    return this.getResult();
  }

  private getResult(): Observable<Album[]> {
    return this.http.get<Album[]>('https://jsonplaceholder.typicode.com/albums');
  }
}
