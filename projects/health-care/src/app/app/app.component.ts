import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';

import { AppState, selectEffectiveTheme } from '../core/core.module';
import { actionSettingsChangeTheme } from "../core/settings/settings.actions";

@Component({
  selector: 'hc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  navigation = [
    {link: 'providers', label: 'Provider Lists'},
    {link: 'favorites', label: 'Favorites'}
  ];

  stickyHeader$: Observable<boolean>;
  theme$: Observable<string>;
  theme: Observable<string>;

  themes = [
    {value: 'DEFAULT-THEME', label: 'blue'},
    {value: 'LIGHT-THEME', label: 'light'},
    {value: 'NATURE-THEME', label: 'nature'},
    {value: 'BLACK-THEME', label: 'dark'}
  ];

  constructor(
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onThemeSelect({value: theme}) {
    this.store.dispatch(actionSettingsChangeTheme({theme}));
  }
}
