import { Component, OnInit } from '@angular/core';
import { Card } from '@jeu-president-library/Card';
import { Party } from '@jeu-president-library/Party';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  party: Party | undefined;

  ngOnInit(): void {
    console.debug('Home - onInit');
  }
  startNewParty(): void {
    if (!this.party) { this.party = new Party(); }
    console.log(this.party);
  }
}
