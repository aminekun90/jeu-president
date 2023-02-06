import { Component } from '@angular/core';
import { Card } from "./model/card";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'daifuqo';
  gameMenuOpened:boolean =false;
  deck: any[] = [];
  hands: Array<Array<Card>> = [];
  gameState:string = 'stopped';
  playersNumber: any = { title: "3 players", value: 3 };
  selectModel = [
    { title: "3 players", value: 3, },
    { title: "4 players", value: 4, },
    { title: "5 players", value: 5, },
    { title: "6 players", value: 6, },
  ]
  openGameMenu(){
    this.gameMenuOpened = true;
  }
  initializeDeck() {
    let neutralCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    let cardsOfSpades = neutralCards.map(powers => new Card(powers, "spades"));
    let cardsOfHearts = neutralCards.map(powers => new Card(powers, "hearts"));
    let cardsOfDiamonds = neutralCards.map(powers => new Card(powers, "diamonds"));
    let cardsOfClubs = neutralCards.map(powers => new Card(powers, "clubs"));
    let numberofplayers = parseInt(this.playersNumber.value);
    this.deck = [];
    this.hands = [];
    this.deck = this.deck.concat(cardsOfSpades).concat(cardsOfHearts).concat(cardsOfClubs).concat(cardsOfDiamonds);
    for (let i = 0; i < numberofplayers; i++)
      this.hands[i] = [];
  }

  shuffle($deck: Array<Array<any>>) {
    let currentIndex = $deck.length, randomIndex
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [$deck[currentIndex], $deck[randomIndex]] = [
        $deck[randomIndex], $deck[currentIndex]];
    }
    return $deck;
  }

  isGameStarted() {
    return this.gameState === 'started';
  }

  giveCards() {
    let numberofplayers = parseInt(this.playersNumber.value);
    let devider = (this.deck.length / numberofplayers) - (this.deck.length % numberofplayers);
    let array: number[][] = []
    for (let i = 0; i < numberofplayers; i++) {
      array[i] = [];
      for (let j = 0; j < devider; j++) {
        if (!i && !j) {
          array[i][j] = 0;
        } else if (i && !j) {
          array[i][j] = array[i - 1][j] + 1;
        } else if (!i && j) {
          array[i][j] = array[i][j - 1] + numberofplayers;
        } else if (i && j) {
          array[i][j] = array[i - 1][j] + 1;
        }
      }
      array.forEach((x, i) => this.hands[i] = x.map(indexes => this.deck[indexes]));
    }
  }

  onStartClick() {
    console.log("Game started",this.playersNumber);
    this.gameState ='started';
    this.initializeDeck();
    this.deck = this.shuffle([...this.deck]);
    this.giveCards();
    console.log(this.hands);
    this.gameMenuOpened=false;
  }
}
