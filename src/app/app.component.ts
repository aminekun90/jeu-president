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
  table: Array<Card> = [];
  hoveredHand: any = null;
  gameState: string = 'stopped';
  playersNumber: any = { title: "3 players", value: 3 };
  timer: any;
  clearedTimer: boolean = true;
  alerts: string = "";
  selectModel = [
    { title: "3 players", value: 3, },
    { title: "4 players", value: 4, },
    { title: "5 players", value: 5, },
    { title: "6 players", value: 6, },
  ];
  /**
   * Open game menu
   */
  openGameMenu() {
    this.gameMenuOpened = true;
  }

  /**
   * Init game deck and table
   */
  initializeDeck() {
    this.table = [];
    this.deck = [];
    this.hands = [];
    const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
    const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

    for (let suit of suits) {
      for (let rank of ranks) {
        this.deck.push(new Card(rank, suit));
      }
    }

    const numberofplayers = parseInt(this.playersNumber.value);
    for (let i = 0; i < numberofplayers; i++) {
      this.hands.push([]);
    }
  }

  /**
   * This function hundles horizontal scroll and vertical scrol on card
   *
   * @param event
   * @returns
   */
  @HostListener('mousewheel', ['$event']) // for window scroll events
  onScroll(event: any) {
    if (event.wheelDeltaX !== 0) {
      return;
    }

    if (this.hoveredHand && this.clearedTimer) {
      this.clearedTimer = false;
      event.preventDefault();

      const scrollDirection = event.wheelDeltaY > 0 ? 'forward' : 'backward';

      setTimeout(() => {
        if (scrollDirection === 'forward') {
          this.moveArrayElementsForward(this.hoveredHand?.value);
        } else if (scrollDirection === 'backward') {
          this.moveArrayElementsBackward(this.hoveredHand?.value);
        }

        this.clearedTimer = true;
      }, 300);
    }
  }

  /**
   * Move to the next card to select
   *
   * @param arr
   * @returns
   */
  moveArrayElementsForward(arr: Card[]) {
    if (!arr || arr.length <= 1) return arr;

    const lastElement = arr.pop() as Card;
    arr.unshift(lastElement);

    return arr;
  }

  /**
  * Move to the previous card to select
  *
  * @param arr
  * @returns
  */
  moveArrayElementsBackward(arr: Card[]) {
    if (!arr || arr.length <= 1) return arr;

    const firstElement = arr.shift() as Card;
    arr.push(firstElement);

    return arr;
  }

  /**
   * Triggered When the mouse enters the deck area
   *
   * @param hand
   */
  mouseEnterDeck(hand: any) {
    this.hoveredHand = hand;
  }

  /**
  * Triggered When the mouse leavs the deck area
  *
  * @param hand
  */
  mouseLeaveDeck(hand: any) {
    this.hoveredHand = null;
  }

  /**
   * Triggered when a card is clicked
   *
   * @param card
   * @param playerIndex
   */
  onCardClick(card: Card, playerIndex: number) {
    this.playCard(card, playerIndex);
  }

  /**
   * Play a given card this function should check if th card can be played or not
   * @param card
   * @param playerIndex
   */
  playCard(card: Card, playerIndex: number) {
    let indexOfCard = this.hands[playerIndex].indexOf(card);
    if (indexOfCard > -1) {

      const canPlay = this.canPlayCard(card);

      if (!canPlay) {
        this.alerts = "cannot play this card";
        return;
      }
      this.hands[playerIndex].splice(indexOfCard, 1);
      this.table.push(card);
    }
  }

  sortHand(hand:Card[]){
    return hand.sort((cardA,cardB)=>{
      return cardA.isGreaterThan(cardB)?1:-1;
    });
  }
  /**
   * Returns if a player can play a card or not
   *
   * @param card
   * @returns
   */
  canPlayCard(card: Card) {
    return card.isGreaterThan(this.table[this.table.length - 1]);
  }

  /**
   * Shuffle deck
   *
   * @param $deck
   * @returns
   */
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

  /**
   * Return if the game has started
   *
   * @returns
   */
  isGameStarted() {
    return this.gameState === 'started';
  }

  /**
   * Give all players cards from the deck there will be remaining cards sometimes
   *
   */
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
    this.hands = this.hands.map((hand)=>this.sortHand(hand));
  }

  /**
   * On start button click
   *
   */
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
