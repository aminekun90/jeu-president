import { Component, Input, OnInit } from '@angular/core';
import { Player } from '@jeu-president-library/Player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public _player: Player | undefined;
  @Input() set player(player: Player | undefined) {
    this._player = player;
  }

  ngOnInit(): void {
    console.log('Player ', this._player);
  }
}
