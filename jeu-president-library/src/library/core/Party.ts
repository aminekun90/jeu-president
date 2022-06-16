import { Card } from "@jeu-president/Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Table } from "./Table";

export class Party {
  private _currentPlayer: number = 0;
  constructor(
    numberOfPlayers: number = 4,
    private _players: Player[] = [],
    private _deck: Deck = new Deck(),
    private _table: Table = new Table(),
  ) {
    this.newParty(numberOfPlayers);
  }

  newParty(numberOfPlayers: number) {
    this._deck.shuffleCards();
    for (let i = 0; i < numberOfPlayers; i++) {
      this.createNewPlayer(`Player ${i + 1}`);
    }
  }

  getPlayers() {
    return this._players;
  }

  getDeck() {
    return this._deck;
  }

  createNewPlayer(name: string) {
    this._players.push(new Player(name));
  }

  givePlayersCards() {
    let cardSets = this._deck.getCardSetsForPlayers(this._players.length)
    this._players.forEach((player, index) => {
      player.setSetsOfCards(cardSets[index]);
      player.resetDone();
    });
  }

  startParty() {
    this.givePlayersCards();
    console.log('New Players', this._players)
  }

  /**
   * Get the set of cards from the current deck
   * @param indexOfPlayer index of the player
   * @returns
   */
  getPlayerSetOfCards(indexOfPlayer: number) {
    return this._deck.getCards().filter((_, indexOfCard) => this._players[indexOfPlayer].getSetsOfCards().includes(indexOfCard));
  }

  getCurrentPlayerSetOfCards() {
    return this.getPlayerSetOfCards(this._currentPlayer);
  }

  getPlayableCardsOfCurrentPlayer() {
    return;
  }

  /**
   * Move to next Player
   */
  nextPlayer(): number {
    this._currentPlayer = this._players.findIndex(player => player.needToPlay());
    if (this._currentPlayer === -1)
      this._currentPlayer = 0;
    this._players[this._currentPlayer].resetDone();
    return this._currentPlayer;
  }

  tryToPlayCards(cards: Array<Card>, player: Player): boolean {
    return this._table.tryToPlayCards(cards, player);
  }

  playCard(indexOfPlayer: number, indexesOfCardsToPlay: number[]) {
    // Need to check if indexesOfCards can be played according to rules else throw an error
    try {
      this.tryToPlayCards(this.getPlayerSetOfCards(indexOfPlayer).filter((_, index) => indexesOfCardsToPlay.includes(index)), this._players[indexOfPlayer]);
    } catch (error) {
      console.log(error);
      throw error;
    }
    this._players[indexOfPlayer].removeCardsFromSet(indexesOfCardsToPlay);
    if (this._players[indexOfPlayer].getSetsOfCards().length === 0) {
      if (!this._table.isCounterCompleted())
        this._players[indexOfPlayer].done();
    }

  }
}
