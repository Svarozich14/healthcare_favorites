import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import * as albumActions from '../albums.actions';
import { selectAlbums } from '../albums.selectors';
import { Album } from '../albums.model';
import { State } from '../../providers.state';
import { filter, takeWhile } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'hc-albums',
  templateUrl: './albums-container.component.html',
  styleUrls: ['./albums-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsContainerComponent implements OnInit, OnDestroy {
  albums$: Observable<Album[]>;

  dataSource: MatTableDataSource<Album>;
  displayedColumns = ['favorite', 'title', 'comment'];
  private alive = true;
  private sourceName: string;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(
    public store: Store<State>,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.sourceName = this.route.snapshot.data.sourceName;
    this.store.dispatch(albumActions.actionAlbumsRetrieve({sourceName: this.sourceName}));

    this.albums$ = this.store.pipe(select(selectAlbums));
    this.albums$
      .pipe(
        takeWhile(() => this.alive),
        filter(items => !!items),
      )
      .subscribe(items => {
        this.dataSource = new MatTableDataSource<Album>(items);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  onToggleItem(item: Album) {
    this.store.dispatch(albumActions.actionAlbumToggle({id: item.id}));
  }

  onChangeItemComment(item: Album, comment: string) {
    this.store.dispatch(albumActions.actionAlbumSaveComment({id: item.id, comment}));
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
