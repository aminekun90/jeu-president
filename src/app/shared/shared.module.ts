import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CardComponent } from './components/card/card.component';
import { DeckComponent } from './components/deck/deck.component';
import { PartyComponent } from './components/party/party.component';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    NavigationComponent,
    CardComponent,
    DeckComponent,
    PartyComponent,
    SplashScreenComponent],
  imports: [CommonModule, TranslateModule, FormsModule, BrowserModule],
  exports: [
    TranslateModule,
    WebviewDirective,
    CardComponent,
    DeckComponent,
    PartyComponent,
    NavigationComponent,
    FormsModule,
    SplashScreenComponent
  ]
})
export class SharedModule { }
