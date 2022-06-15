import { Component, Input, OnInit } from '@angular/core';
import { Card } from '@jeu-president-library/Card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card = new Card("", 1, "", 2);
  constructor() {
  }

  ngOnInit(): void {
  }
}
