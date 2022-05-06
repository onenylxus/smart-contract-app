import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WalletService } from '../wallet/wallet.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  public message: string = '';
  private wallet: string = '';

  @Input() set text(value: string) {
    this.message = value;
  }

  @Output() btnClick = new EventEmitter();

  constructor(private walletService: WalletService) {
    this.updateInterface();
  }

  onClick(): void {
    if (this.wallet.length > 0) { return; }

    this.walletService.signIn().then((accounts) => {
      this.wallet = accounts[0];
      this.updateInterface();

      const container = document.getElementById('transactions')!;

      this.walletService.getTransactions(this.wallet).subscribe((result) => {
        console.log(result.result);
        const data = result.result.map((transaction: any) => ({ from: transaction.from, to: transaction.to, value: transaction.value }));

        const table = document.createElement('table');
        table.setAttribute('style', 'border: 2px solid');

        const tableHead = document.createElement('thead');
        const hrow = document.createElement('tr');
        Object.keys(data[0]).forEach((key: any) => {
          const cell = document.createElement('th');
          cell.appendChild(document.createTextNode(`${key[0].toUpperCase()}${key.slice(1)}`));
          cell.setAttribute('style', 'border: 1px solid');
          hrow.appendChild(cell);
        });
        tableHead.appendChild(hrow);
        table.appendChild(tableHead);

        const tableBody = document.createElement('tbody');
        data.forEach((transaction: any) => {
          const row = document.createElement('tr');
          Object.values(transaction).forEach((value: any) => {
            const cell = document.createElement('td');
            cell.appendChild(document.createTextNode(value));
            cell.setAttribute('style', `border: 1px solid; font-size: 14px;${value === this.wallet ? 'color: #ff6666' : ''}`);
            row.appendChild(cell);
          });
          tableBody.appendChild(row);
        });

        table.appendChild(tableBody);
        container.appendChild(table);
        container.setAttribute('style', 'padding: 8px 0');
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  updateInterface(): void {
    switch (true) {
      case !this.walletService.isMetaMask: this.text = 'Please install MetaMask'; break;
      case this.wallet.length === 0: this.text = 'Click to connect MetaMask'; break;
      default: this.text = `Address: ${this.wallet}`;
    }

    const container = document.getElementById('transactions');
    if (container && container.hasChildNodes()) {
        container.removeChild(container.firstChild!);
        container.setAttribute('style', 'padding: 0');
      }

    document.getElementById('logout')?.setAttribute('style', `display: ${this.wallet.length > 0 ? 'inline' : 'none'}`);
  }

  logout(): void {
    this.wallet = '';
    this.updateInterface();
  }
}
