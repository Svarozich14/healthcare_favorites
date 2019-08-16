import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'hc-easter-egg',
  templateUrl: './easter-egg.component.html',
  styleUrls: ['./easter-egg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EasterEggComponent implements OnInit {

  ngOnInit() {
    console.log('easter-egg page')
  }

}
