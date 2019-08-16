import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { State } from "../../providers.state";
import { LocalStorageService } from '../../../../core/core.module';
import { Post } from "../../posts/posts.model";
import { Album } from "../../albums/albums.model";

@Component({
  selector: 'hc-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
  favoriteAlbums?: Album[];
  favoritePosts?: Post[];

  constructor(
    private localStorageService: LocalStorageService,
    public store: Store<State>,
  ) {
  }

  ngOnInit() {
    this.favoriteAlbums = this.localStorageService.getItem('PROVIDERS.ALBUMS');
    this.favoritePosts = this.localStorageService.getItem('PROVIDERS.POSTS');
  }

}
