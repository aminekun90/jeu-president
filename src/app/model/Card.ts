export class Card {
    private cardPower: number | string = 0;
    private type: string = "";
    constructor($cardPower: string | number,type:string) {
      this.cardPower = $cardPower;
      this.type = type;
    }

    getCardPower(): number | string { return this.cardPower; }
    getType():  string { return this.type; }

    isGreaterThan($card: Card, $isRevolution = false): boolean {
      let givenCardPower: string | number = $card.getCardPower();
      if (givenCardPower === this.cardPower) {
        return false;
      }

      if (typeof this.cardPower === 'number' && typeof givenCardPower === 'number') {
        return (this.cardPower > $card.cardPower && !$isRevolution) || (this.cardPower < $card.cardPower && $isRevolution);
      }

      if (givenCardPower === 2 && !$isRevolution || givenCardPower === 3 && $isRevolution) {
        return false;
      }

      if (typeof this.cardPower === 'string' && typeof givenCardPower === 'number') {
        if ((givenCardPower === 2 && !$isRevolution) || (givenCardPower === 3 && $isRevolution)) {
          return false;
        }
        return true; // String cards are powerfull
      }

      if (typeof this.cardPower === 'number' && typeof givenCardPower === 'string') {
        if ((this.cardPower === 2 && !$isRevolution) || (this.cardPower === 3 && $isRevolution)) {
          return true;
        }
        return false;// String cards are powerfull
      }
      if (typeof this.cardPower === 'string' && typeof givenCardPower === 'string') {
        //Q,J,K,A
        let stringPowers: any = {
          'Q': 0,
          'J': 1,
          'K': 2,
          'A': 3,
        }
        return $isRevolution ? stringPowers[this.cardPower] > stringPowers[givenCardPower] : stringPowers[this.cardPower] < stringPowers[givenCardPower];
      }
      return false;
    }
  }

  export const symbolsTable = [
    {
      "col_up": {
        value: 0
      },
      "col_center": 1,
      "col_down": {
        value: 0
      }
    },
    {
      "col_up": {
        value: 0
      },
      "col_center": 2,
      "col_down": {
        value: 0
      }
    },
    {
      "col_up": {
        value: 0
      },
      "col_center": 3,
      "col_down": {
        value: 0
      }
    },
    {
      "col_up": {
        value: 2
      },
      "col_center": 0,
      "col_down": {
        value: 2
      }
    },
    {
      "col_up": {
        value: 2
      },
      "col_center": 1,
      "col_down": {
        value: 2
      }
    },
    {
      "col_up": {
        value: 3
      },
      "col_center": 0,
      "col_down": {
        value: 3
      }
    },
    {
      "col_up": {
        value: 3
      },
      "col_center": 1,
      "col_down": {
        value: 3
      }
    },
    {
      "col_up": {
        value: 3
      },
      "col_center": 2, "col_down": {
        value: 3
      }
    },
    {
      "col_up": {
        value: 4
      }, "col_center": 1, "col_down": {
        value: 4
      }
    },
    {
      "col_up": {
        value: 4
      }, "col_center": 2, "col_down": {
        value: 4
      }
    }
  ];
