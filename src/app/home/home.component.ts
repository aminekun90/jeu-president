import { Component, OnInit } from '@angular/core';
import { Card } from '@jeu-president-library/Card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  card = new Card('A', 1, '♣', 13);
  constructor() { }

  ngOnInit(): void {
  }

}
