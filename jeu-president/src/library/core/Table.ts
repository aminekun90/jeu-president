import { Card } from "./Card";
import { Player } from "./Player";
import { lastMove } from "./types";

export class Table {
    private _lastMove: lastMove = {
        player: {},
        playedCards: [],
        counterOfCards: 0
    };


    constructor() {
        this.initState();
    }

    initState() {
        this._lastMove.isSameAsLast = false;
        this._lastMove.isDouble = false;
        this._lastMove.isTriple = false;
        this._lastMove.isFour = false;
        this._lastMove.isRevolution = false;
        this._lastMove.counterOfCards = 0;
    }

    getLastCard(): Card | null {
        return this._lastMove.playedCards.length ? this._lastMove.playedCards[this._lastMove.playedCards.length - 1] : null;
    }

    isCounterCompleted() {
        return this._lastMove.counterOfCards === 4;
    }

    tableIsEmpty() {
        return !!this._lastMove.playedCards.length;
    }

    addToEmptyTable(cards: Card[], player: Player): boolean {

        switch (cards.length) {
            case 1:
                this.initState();
                break;
            case 2:
                this.initState();
                this._lastMove.isDouble = true;
                this._lastMove.counterOfCards += 2;
                break;
            case 3:
                this.initState();
                this._lastMove.isTriple = true;
                break;
            case 4:
                this.initState();
                this._lastMove.isFour = true;
                this._lastMove.isDouble = true;
                this._lastMove.counterOfCards = 4; // Revolution
                this._lastMove.isRevolution = true; // Revolution
                break;
            default: throw new Error("Cannot play more than 4 cards at the same time");
        }
        this._lastMove.playedCards = cards;
        this._lastMove.player = player;
        return true;
    }

    hundleDoubleOnNotEmptyTable(cards: Card[]) {
        if (this._lastMove.isDouble) {
            if (cards.length !== 2)
                throw Error("Played Cards must be double!");
            if (cards[0].getPower() !== cards[1].getPower())
                throw Error("Played Cards must be the same!");
            if (cards.some(card => this._lastMove.playedCards.find(lastPlayedCard => lastPlayedCard.getPower() > card.getPower())))
                throw Error("Played Cards must be greater or equal to the last played!");
            if (this._lastMove.playedCards[0].getPower() === cards[0].getPower() && this._lastMove.playedCards[1].getPower() === cards[1].getPower())
                this._lastMove.counterOfCards += 2;
            // Greater
            this._lastMove.playedCards = cards;
        }
    }

    addToNotEmptyTable(cards: Card[], player: Player): boolean {
        switch (this._lastMove.playedCards.length) {
            case 1:
                if (this._lastMove.playedCards[0].getPower() > cards[0].getPower()) {
                    throw Error("Card in table is too powerfull");
                } else if (this._lastMove.playedCards[0].getPower() < cards[0].getPower()) {// card on table is lower than the played one
                    this._lastMove.playedCards = cards;
                    this.initState();
                } else {// Equal
                    this._lastMove.playedCards = cards;
                    this._lastMove.isSameAsLast = true;
                    this._lastMove.counterOfCards++;
                }
                break;
            case 2:
                this.hundleDoubleOnNotEmptyTable(cards);
                break;
            case 3:

                break;
            case 4:
                this.initState();
                this._lastMove.isFour = true;
                break;
        }
        this._lastMove.player = player;
        return true;
    }

    addCardsToTable(cards: Card[], player: Player): boolean {
        if (!cards.length) {
            throw new Error("You didn't play anything!");
        }
        if (this.tableIsEmpty() && cards.length) {
            return this.addToEmptyTable(cards, player);
        }
        return this.addToNotEmptyTable(cards, player);

    }


    tryToPlayCards(cards: Card[], player: Player): boolean {
        return this.addCardsToTable(cards, player);
    }
}