import { Component, OnInit } from '@angular/core';
import { Party } from '@jeu-president-library/Party';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  party: Party | undefined;
  playersNumber: any = { title: "4 players", value: 4 };
  selectModel = [
    { title: "4 players", value: 4, },
    { title: "5 players", value: 5, },
    { title: "6 players", value: 6, },
  ]

  ngOnInit(): void {
    console.debug('Home - onInit');
  }
  startNewParty(): void {
    this.party = new Party(this.playersNumber.value);
    this.party.getDeck().shuffleCards();

    this.party.startParty();
    console.log(this.party);
  }
}
