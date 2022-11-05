import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { MyAccountComponent } from './my-account/my-account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyAccountComponent,
    PageNotFoundComponent,
    SplashScreenComponent,
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
