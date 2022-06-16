import { Component, Input, OnInit } from '@angular/core';
import { Party } from '@jeu-president-library/Party';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {
  public _party: Party | undefined;
  @Input() set party(party: Party | undefined) {
    this._party = party;
  }

  ngOnInit(): void {
    console.log('Party started', this._party);
  }

}
