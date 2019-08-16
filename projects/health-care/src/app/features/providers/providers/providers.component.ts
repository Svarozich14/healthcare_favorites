import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'hc-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvidersComponent implements OnInit {
  providers = [
    {link: 'albums', label: 'Albums'},
    {link: 'posts', label: 'Posts'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
