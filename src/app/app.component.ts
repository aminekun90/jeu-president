import { Component } from '@angular/core';
import { Card, symbolsTable } from "./model/card";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'daifuqo';
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
    console.log("Normal deck",this.deck);
    this.deck = this.shuffle([...this.deck]);
    console.log("Shuffle deck",this.deck);
    this.giveCards();
    console.log(this.hands);
  }


  getCardFullName($card: Card) {
    switch ($card.getCardPower()) {
      case 'A': return `a${$card.getType()}.svg`;
      case 'K': return 'king.svg';
      case 'Q': return 'queen.svg';
      case 'J': return 'jota.svg';
      case 'Joker': return 'joker.svg';
      default: return '';
    }
  }

  createRange(number: number): Array<number> {
    return new Array(number);
  }
  isRotated(item: number, $card: Card): boolean {
    let name: any = $card.getCardPower();
    return item === 3 && [10, 9].includes(name)
  }


  isBig($card: Card) {
    let name: any = $card.getCardPower();
    return [10, 8].includes(name)
  }

  isHuge($card: Card) {
    let name: any = $card.getCardPower();
    return [7].includes(name)
  }

  isInnerCentered($card: Card) {
    let name = $card.getCardPower();
    return [2, 3, 'A', 'J', 'Q', 'K'].includes(name);
  }
  isKQJA($card: Card) {
    let name: any = $card.getCardPower();
    return ['A', 'J', 'Q', 'K'].includes(name);
  }
  convertStringToNumber(input: string | undefined): number {
    if (!input) return NaN;
    if (typeof input === 'number') {
      return input
    };
    if (input.trim().length == 0) {
      return NaN;
    }
    return Number(input);
  }
  getSymbolsTable($card: Card): { col_up: any; col_center: number; col_down: any; } {
    let name: any = $card.getCardPower()
    let value = this.convertStringToNumber(['A', 'J', 'K', 'Q'].includes(name) ? '0' : name);
    return symbolsTable[value ? value - 1 : 0];
  }

  getColumnUp($card: Card) {
    return this.getSymbolsTable($card).col_up;
  }
  getColumnCenter($card: Card) {
    return this.getSymbolsTable($card).col_center;
  }
  getColumnDown($card: Card) {
    return this.getSymbolsTable($card).col_down;
  }
}
