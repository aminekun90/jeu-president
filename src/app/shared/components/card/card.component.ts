import { Component, Input, OnInit } from '@angular/core';
import { Card } from '@jeu-president-library/Card';
import { symbolsTable } from '@jeu-president-library/Consts';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public _card: Card | undefined;
  public _hidden: boolean = false;
  @Input() set card(card: Card | undefined) {
    this._card = card;
  }
  @Input() set hidden(hidden: boolean) {
    this._hidden = hidden;
  }

  ngOnInit(): void { }

  getSymbolsTable(): { col_up: any; col_center: number; col_down: any; } {
    let name = this._card?.getName() ? this._card?.getName() : '0';
    let value = this.convertStringToNumber(['A', 'J', 'K'].includes(name) ? '0' : name);
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

  convertStringToNumber(input: string | undefined): number {
    if (!input) return NaN;

    if (input.trim().length == 0) {
      return NaN;
    }
    return Number(input);
  }

  createRange(number: number): Array<number> {
    return new Array(number);
  }
  isRotated(item: number): boolean {
    let name = this._card?.getName() ? this._card?.getName() : '0';
    return item === 3 && ['10', '9'].includes(name)
  }
  isBig() {
    let name = this._card?.getName() ? this._card?.getName() : '0';
    return ['10', '8'].includes(name)
  }
  isHuge() {
    let name = this._card?.getName() ? this._card?.getName() : '0';
    return ['7'].includes(name)
  }
  isInnerCentered() {
    let name = this._card?.getName() ? this._card?.getName() : '0';
    return ['2', '3', 'A', 'Q', 'K'].includes(name)
  }
}
