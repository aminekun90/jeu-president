import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Card } from '@daifuqo/app/model/Card';

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
  _notSelectable:boolean = false;
  cardClass = 'card card--';
  @Input() set card(card: Card) {
    this._card = card;
    this.cardClass = 'card card--' + this._card.getType();
  }
  @Input() set hidden(hidden: boolean) {
    this._hidden = hidden;
  }

  @Input() set notSelectable(notSelectable: boolean) {
    this._notSelectable = notSelectable;
  }

  select() {
    this.isSelected = true;
  }

  createRange(number: number): Array<number> {
    return new Array(number);
  }
}
