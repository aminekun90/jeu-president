export class Card {
  private cardPower: number | string = 0;
  private type: string = "";
  constructor($cardPower: string | number, type: string) {
    this.cardPower = $cardPower;
    this.type = type;
  }

  getCardPower(): number | string { return this.cardPower; }
  getType(): string { return this.type; }
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
  /**
   * is current card K,Q,J, or A
   * @returns
   */
  isKQJA() {
    let name: any = this.getCardPower();
    return ['A', 'J', 'Q', 'K'].includes(name);
  }

  /**
   * Current card is greater than a given card
   *
   * @param card
   * @param isRevolution
   * @returns
   */
  isGreaterThan(card: Card, isRevolution = false) {
    const cardPower = card?.getCardPower();
    if (!cardPower || cardPower === this.cardPower || !card) {
      return true;
    }
    if (!isRevolution && cardPower === 2 || isRevolution && cardPower === 3) {
      return false;
    }
    if (!isRevolution && this.cardPower === 2 || isRevolution && this.cardPower === 3) {
      return true;
    }
    const isString = typeof this.cardPower === 'string' || typeof cardPower === 'string';

    if (isString) {
      const thisCardPower: string = this.cardPower as string;
      const otherCardPower = cardPower as string;
      const stringPowers: any = { 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, J: 11, Q: 12, K: 13, A: 14 };
      const isGreater = !isRevolution
        ? stringPowers[thisCardPower] > stringPowers[otherCardPower]
        : stringPowers[thisCardPower] < stringPowers[otherCardPower];
      return isGreater;
    }

    const currentGreaterWithRevolution = this.cardPower < cardPower && isRevolution;
    const currentGreaterWithoutRevolution = this.cardPower > cardPower && !isRevolution;

    return currentGreaterWithRevolution || currentGreaterWithoutRevolution;
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
