import { Component, OnInit } from '@angular/core';
import { APP_CONFIG } from '../../../../../../jeu-president-app/src/environments/environment';


@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
  windowWidth: string = "";
  showSplash = true;
  version = APP_CONFIG.version;
  ngOnInit(): void {
    setTimeout(() => {
      this.windowWidth = "-" + window.innerWidth + "px";
      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, 500);
    }, 3000);
  }
}
