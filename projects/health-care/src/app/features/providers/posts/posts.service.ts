import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(private http: HttpClient) {
  }

  retrievePosts(): Observable<Post[]> {
    return this.getResult();
  }

  private getResult(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
}
