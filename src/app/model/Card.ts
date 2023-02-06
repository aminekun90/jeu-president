export class Card {
    private cardPower: number | string = 0;
    private type: string = "";
    constructor($cardPower: string | number,type:string) {
      this.cardPower = $cardPower;
      this.type = type;
    }

    getCardPower(): number | string { return this.cardPower; }
    getType():  string { return this.type; }
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
    getSymbolsTable(): { col_up: any; col_center: number; col_down: any; } {
      let name: any = this.getCardPower()
      let value = this.convertStringToNumber(['A', 'J', 'K', 'Q'].includes(name) ? '0' : name);
      return symbolsTable[value ? value - 1 : 0];
    }
    getColumnUp() {
      return this.getSymbolsTable().col_up;
    }
    getColumnCenter() {
      return this.getSymbolsTable().col_center;
    }
    getColumnDown() {
      return this.getSymbolsTable().col_down;
    }
    getCardFullName() {
      switch (this.getCardPower()) {
        case 'A': return `a${this.getType()}.svg`;
        case 'K': return 'king.svg';
        case 'Q': return 'queen.svg';
        case 'J': return 'jota.svg';
        case 'Joker': return 'joker.svg';
        default: return '';
      }
    }
    isBig() {
      let name: any = this.getCardPower();
      return [10, 8].includes(name)
    }

    isHuge() {
      let name: any = this.getCardPower();
      return [7].includes(name)
    }
    isRotated(item: number): boolean {
      let name: any = this.getCardPower();
      return item === 3 && [10, 9].includes(name)
    }
    isInnerCentered() {
      let name = this.getCardPower();
      return [2, 3, 'A', 'J', 'Q', 'K'].includes(name);
    }
    isKQJA() {
      let name: any = this.getCardPower();
      return ['A', 'J', 'Q', 'K'].includes(name);
    }
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
