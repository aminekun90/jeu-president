export class Player {
  private _name: string;
  private _needToPlay: boolean = true;
  private _cardSets: Array<number> = [];
  constructor(name: string) {
    this._name = name;
  }

  setSetsOfCards(cardSets: Array<number>) {
    this._cardSets = cardSets;
  }

  getSetsOfCards(): Array<number> {
    return this._cardSets;
  }

  getName(): string {
    return this._name;
  }

  needToPlay() {
    return this._needToPlay;
  }

  done() {
    this._needToPlay = false;
  }

  resetDone() {
    this._needToPlay = true;
  }

  removeCardsFromSet(indexesOfCards: number[]) {
    this._cardSets = this._cardSets.filter((_, index) => !indexesOfCards.includes(index));
  }
}
