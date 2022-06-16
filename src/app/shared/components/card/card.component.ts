import { Component, Input, OnInit } from '@angular/core';
import { Card } from '@jeu-president-library/Card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public _card: Card | undefined;
  @Input() set card(card: Card | undefined) {
    this._card = card;
  }

  ngOnInit(): void {
  }
  createRange(number: number) {
    return new Array(number);

  }
  convertStringToNumber(input: string | undefined) {

    if (!input) return NaN;

    if (input.trim().length == 0) {
      return NaN;
    }
    return Number(input);
  }
}
