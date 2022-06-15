import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    SharedComponent,
    NavigationComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [CardComponent, NavigationComponent]
})
export class SharedModule { }
