import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { CardComponent } from './card/card.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule,FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [
    SplashScreenComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,FormsModule,FontAwesomeModule
  ],
  exports:[
    CardComponent,
    SplashScreenComponent,
    FormsModule,FontAwesomeModule
  ]
})
export class SharedModule {
  constructor(library:FaIconLibrary){
    library.addIconPacks(fas, far);
  }
}
