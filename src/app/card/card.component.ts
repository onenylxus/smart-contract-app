import { Component, Output, EventEmitter } from '@angular/core';
import { WalletService } from '../wallet/wallet.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Output() btnClick = new EventEmitter();

  constructor(private walletService: WalletService) {}

  onClick(): void {
    this.walletService.signIn()?.subscribe((response) => {
      console.log(response);
    });
  }
}
