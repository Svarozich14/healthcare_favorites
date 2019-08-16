import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EasterEggComponent } from './easter-egg/easter-egg.component';
import { EasterEggRoutingModule } from './easter-egg-routing.module';

@NgModule({
  declarations: [EasterEggComponent],
  imports: [CommonModule, EasterEggRoutingModule]
})
export class EasterEggModule {
}
