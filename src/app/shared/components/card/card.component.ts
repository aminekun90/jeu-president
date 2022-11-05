import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Card } from '@daifugo/Card';
import { symbolsTable } from '@daifugo/Consts';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @ViewChild('cardElement') cardElement: ElementRef | undefined;
  public _card: Card | undefined;
  public _hidden: boolean = false;
  isSelected: boolean = false;
  cardClass = 'card card--';

  @Input() set card(card: Card | undefined) {
    this._card = card;
    this.cardClass = 'card card--' + this._card?.getCategory();
  }
  @Input() set hidden(hidden: boolean) {
    this._hidden = hidden;
  }
  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.cardElement?.nativeElement) {
        this.isSelected = false;
      }
    });
  }
  select() {
    this.isSelected = true;
  }
  ngOnInit(): void {
    this.cardClass = 'card card--' + this._card?.getCategory();
  }

  getSymbolsTable(): { col_up: any; col_center: number; col_down: any; } {
    let name = this._card?.getName() ? this._card?.getName() : '0';
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

  isKQJA() {
    let name = this._card?.getName() ? this._card?.getName() : '0';
    return ['A', 'J', 'Q', 'K'].includes(name);
  }

  getCardFullName() {
    switch (this._card?.getName()) {
      case 'A': return `a${this._card.getCategory()}.svg`;
      case 'K': return 'king.svg';
      case 'Q': return 'queen.svg';
      case 'J': return 'jota.svg';
      case 'Joker': return 'joker.svg';
      default: return '';
    }
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
    return ['2', '3', 'A', 'J', 'Q', 'K'].includes(name);
  }
}
