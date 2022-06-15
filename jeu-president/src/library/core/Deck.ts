import { Card } from "./Card";
import { CATEGORIES, NAME_BY_INDEX, POWER_BY_INDEX, POWER_BY_INDEX_REVOLUTION, POWER_BY_NAME, POWER_BY_NAME_REVOLUTION } from "./Consts";
import { CardSets } from "./types";

export class Deck {

    constructor(
        private _revolution: boolean = false,
        private _cardsNumber: number = 52,
        private _cards: Card[] = [],
    ) {
        this.initCards();
    }

    /**
     * 
     * @returns 
     */
    public getCards() {
        return this._cards;
    }

    /**
     * 
     *
     */
    public initCards() {
        for (const category in CATEGORIES) {
            for (let i = 1; i < 14; i++) {
                this._cards.push(new Card(this.getNameByIndex(i), i, CATEGORIES[category as keyof unknown], this.getPowerByIndex(i)));
            }
        }
    }

    /**
     * 
     * @param playersNumber 
     * @returns 
     */
    public getCardSetsForPlayers(playersNumber: number): CardSets {
        let devider = (this._cards.length / playersNumber) - (this._cards.length % playersNumber);
        let cardSets: CardSets = {};
        // Creating sets
        let array: number[][] = [];
        for (let i = 0; i < playersNumber; i++) {
            array[i] = [];
            for (let j = 0; j < devider; j++) {
                if (!i && !j) {
                    array[i][j] = 0;
                } else if (i && !j) {
                    array[i][j] = array[i - 1][j] + 1;
                } else if (!i && j) {
                    array[i][j] = array[i][j - 1] + playersNumber;
                } else if (i && j) {
                    array[i][j] = array[i - 1][j] + 1;
                }
            }

        }

        console.log(array);
        console.log("Cards remaining", this._cards.length % playersNumber);
        array.forEach((x, i) => cardSets[i] = x);
        console.log(cardSets);
        return cardSets;
    }

    /**
     * 
     * @param index 
     * @returns 
     */
    public getNameByIndex(index: number): string {
        if (index.toString() in NAME_BY_INDEX) {
            return NAME_BY_INDEX[index.toString() as keyof unknown];
        } else {
            throw new Error("Name not found");
        }
    }

    /**
     * 
     * @param index 
     * @returns 
     */
    public getPowerByIndex(index: number): number {
        if (index.toString() in POWER_BY_INDEX_REVOLUTION && index.toString() in POWER_BY_INDEX) {
            return this._revolution ? POWER_BY_INDEX_REVOLUTION[index.toString() as keyof unknown] : POWER_BY_INDEX[index.toString() as keyof unknown];
        } else {
            throw new Error("Power not found");
        }
    }

    /**
     * 
     * @returns 
     */
    public shuffleCards() {
        let currentIndex = this._cards.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [this._cards[currentIndex], this._cards[randomIndex]] = [
                this._cards[randomIndex], this._cards[currentIndex]];
        }
        return this._cards;
    }

    /**
     * 
     * @returns 
     */
    public orderCards() {
        this._cards = [];
        this.initCards();
        return this._cards;
    }

    public vivaLaRevolution() {
        this._cards.forEach(card => card.setPower(POWER_BY_NAME_REVOLUTION[card.getName() as keyof unknown]))
        this._revolution = true;
    }

    public disableRevolution() {
        this._cards.forEach(card => card.setPower(POWER_BY_NAME[card.getName() as keyof unknown]))
        this._revolution = true;
    }
}
