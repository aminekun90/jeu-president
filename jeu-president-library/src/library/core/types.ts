import { Card } from "./Card";
import { Player } from "./Player";

export type CardSets = { [key: string]: Array<number> };
export type lastMove = {
    player: Player | Object;
    playedCards: Card[];
    counterOfCards: number;
    isSameAsLast?: boolean;
    isDouble?: boolean;
    isTriple?: boolean;
    isFour?: boolean;
    isRevolution?: boolean;
} 
