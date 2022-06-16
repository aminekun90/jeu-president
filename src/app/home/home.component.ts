import { Component, OnInit } from '@angular/core';
import { Party } from '@jeu-president-library/Party';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  party: Party | undefined;
  playersNumber: number = 4;
  selectModel = [
    { title: "1 player", value: 1, },
    { title: "2 players", value: 2, },
    { title: "3 players", value: 3, },
    { title: "4 players", value: 4, },
    { title: "5 players", value: 5, },
  ]

  ngOnInit(): void {
    console.debug('Home - onInit');
  }
  startNewParty(): void {
    this.party = new Party(this.playersNumber);
    this.party.getDeck().shuffleCards();

    this.party.startParty();
    console.log(this.party);
  }
}
