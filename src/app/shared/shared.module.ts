import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CardComponent } from './components/card/card.component';
import { DeckComponent } from './components/deck/deck.component';
import { PartyComponent } from './components/party/party.component';

@NgModule({
  declarations: [
    SharedComponent,
    NavigationComponent,
    CardComponent,
    DeckComponent,
    PartyComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedRoutingModule,
  ],
  exports: [CardComponent, DeckComponent, PartyComponent, NavigationComponent]
})
export class SharedModule { }
