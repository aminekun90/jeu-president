import { Component, Input, OnInit } from '@angular/core';
import { Deck } from '@daifugo/Deck';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  public _deck: Deck | undefined;
  hidden: boolean = true;
  @Input() set deck(deck: Deck | undefined) {
    this._deck = deck;
  }

  ngOnInit(): void {
    console.log('Deck value: ', this._deck);
  }

}
