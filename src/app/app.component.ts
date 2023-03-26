import { Component, HostListener } from '@angular/core';
import { Card } from '@daifuqo/app/model/Card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'daifuqo';
  gameMenuOpened: boolean = false;
  deck: any[] = [];
  hands: Array<Array<Card>> = [];
  hoveredHand: any = null;
  gameState: string = 'stopped';
  playersNumber: any = { title: "3 players", value: 3 };
  timer:any;
  clearedTimer:boolean=true;
  selectModel = [
    { title: "3 players", value: 3, },
    { title: "4 players", value: 4, },
    { title: "5 players", value: 5, },
    { title: "6 players", value: 6, },
  ]
  openGameMenu() {
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

  @HostListener('mousewheel', ['$event']) // for window scroll events
  onScroll(event: any) {
    if(this.hoveredHand && this.clearedTimer){
      this.clearedTimer=false;
      event.preventDefault();
      this.timer = setTimeout(()=>{
        console.log(this.hoveredHand.value);

        if(event.wheelDelta>100)
        this.moveArrayElementsForward(this.hoveredHand.value)
        if(event.wheelDelta<100)
        this.moveArrayElementsBackward(this.hoveredHand.value)
        clearTimeout(this.timer);
        this.clearedTimer=true;
      },300);
    }
  }

  moveArrayElementsForward(arr:Card[]) {
    if (arr.length <= 1) return arr;

    const lastElement = arr.pop() as Card;
    arr.unshift(lastElement);

    return arr;
  }

  moveArrayElementsBackward(arr:Card[]) {
    if (arr.length <= 1) return arr;

    const firstElement = arr.shift() as Card;
    arr.push(firstElement);

    return arr;
  }

  mouseEnterDeck(hand: any) {
    this.hoveredHand = hand;
  }
  mouseLeaveDeck(hand: any) {
    this.hoveredHand = null;
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
    const numberOfPlayers = parseInt(this.playersNumber.value);
    const cardsPerPlayer = Math.floor(this.deck.length / numberOfPlayers);

    this.hands = Array.from({ length: numberOfPlayers }, () => []);

    for (let i = 0; i < cardsPerPlayer; i++) {
      for (let j = 0; j < numberOfPlayers; j++) {
        const cardIndex = i * numberOfPlayers + j;
        this.hands[j].push(this.deck[cardIndex]);
      }
    }
  }

  onStartClick() {
    console.log("Game started", this.playersNumber);
    this.gameState = 'started';
    this.initializeDeck();
    this.deck = this.shuffle([...this.deck]);
    this.giveCards();
    console.log(this.hands);
    this.gameMenuOpened = false;
  }
}
