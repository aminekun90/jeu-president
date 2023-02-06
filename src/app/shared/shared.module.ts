import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { CardComponent } from './card/card.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SplashScreenComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,FormsModule
  ],
  exports:[
    CardComponent,
    SplashScreenComponent,
    FormsModule
  ]
})
export class SharedModule { }
