import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import * as postActions from '../posts.actions';
import { selectPosts } from '../posts.selectors';
import { Post } from '../posts.model';
import { State } from '../../providers.state';
import { filter } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { Album } from "../../albums/albums.model";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'hc-posts',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsContainerComponent implements OnInit {
  posts$: Observable<Post[]>;

  dataSource: MatTableDataSource<Album>;
  displayedColumns = ['favorite', 'title', 'comment'];
  private sourceName: string;
  private alive = true;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    public store: Store<State>,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.sourceName = this.route.snapshot.data.sourceName;
    this.store.dispatch(postActions.actionPostsRetrieve({sourceName: this.sourceName}));

    this.posts$ = this.store.pipe(select(selectPosts));
    this.posts$
      .pipe(
        filter(items => !!items),
      )
      .subscribe(items => {
        this.dataSource = new MatTableDataSource<Album>(items);
        this.dataSource.sort = this.sort;
      });
  }

  onToggleItem(item: Post) {
    this.store.dispatch(postActions.actionPostsToggle({id: item.id}));
  }

  onChangeItemComment(item: Album, comment: string) {
    this.store.dispatch(postActions.actionPostSaveComment({id: item.id, comment}));
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
