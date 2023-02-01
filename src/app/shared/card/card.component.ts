import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Card, symbolsTable } from 'src/app/model/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @ViewChild('cardElement') cardElement: ElementRef | undefined;
  public _card: Card = new Card(0,"heart");
  public _hidden: boolean = false;
  isSelected: boolean = false;
  cardClass = 'card card--';
  @Input() set card(card: Card) {
    this._card = card;
    this.cardClass = 'card card--' + this._card.getType();
  }
  @Input() set hidden(hidden: boolean) {
    this._hidden = hidden;
  }
  isBig() {
    let name: any = this._card.getCardPower();
    return [10, 8].includes(name)
  }

  isHuge() {
    let name: any = this._card.getCardPower();
    return [7].includes(name)
  }

  isInnerCentered() {
    let name = this._card.getCardPower();
    return [2, 3, 'A', 'J', 'Q', 'K'].includes(name);
  }
  isKQJA() {
    let name: any = this._card.getCardPower();
    return ['A', 'J', 'Q', 'K'].includes(name);
  }
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
    let name: any = this._card.getCardPower()
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
    switch (this._card.getCardPower()) {
      case 'A': return `a${this._card.getType()}.svg`;
      case 'K': return 'king.svg';
      case 'Q': return 'queen.svg';
      case 'J': return 'jota.svg';
      case 'Joker': return 'joker.svg';
      default: return '';
    }
  }

  createRange(number: number): Array<number> {
    return new Array(number);
  }
  isRotated(item: number): boolean {
    let name: any = this._card.getCardPower();
    return item === 3 && [10, 9].includes(name)
  }
}
