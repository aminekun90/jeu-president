import { Component, Input, OnInit } from '@angular/core';
import { Party } from '@jeu-president-library/Party';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  public _party: Party | undefined;
  @Input() set party(party: Party | undefined) {
    this._party = party;
  }

  ngOnInit(): void {
    console.log('Party started', this.party);
  }

}
