import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WalletCardComponent } from './wallet-card/wallet-card.component';
import { ContractCardComponent } from './contract-card/contract-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WalletCardComponent,
    ContractCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
