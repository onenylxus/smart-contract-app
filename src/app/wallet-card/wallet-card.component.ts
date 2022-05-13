import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WalletService } from '../wallet/wallet.service';

@Component({
  selector: 'app-wallet-card',
  templateUrl: './wallet-card.component.html',
  styleUrls: ['./wallet-card.component.css']
})
export class WalletCardComponent {
  public message: string = '';
  private wallet: string = '';

  @Input() set text(value: string) {
    this.message = value;
  }

  @Output() btnClick = new EventEmitter();

  constructor(private walletService: WalletService) {
    this.updateInterface();
  }

  /**
   * Callback function when card is clicked.
   */
  onClick(): void {
    // Allow sign in only if wallet address stored is empty
    if (this.wallet.length > 0) { return; }

    // Sign in to MetaMask
    this.walletService.signIn().then((accounts) => {
      // Store wallet address and update interface
      this.wallet = accounts[0];
      this.updateInterface();

      const container = document.getElementById('transactions')!;

      // Get transactions involving specified wallet address
      this.walletService.getTransactions(this.wallet).subscribe((result) => {
        /*
          Process transaction table from result.result
          In this case we only take 'from', 'to' and 'value' properties from the table
        */
        const data = result.result.map((transaction: any) => ({ from: transaction.from, to: transaction.to, value: transaction.value }));

        // Generate table elements
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

        // Append table into card element
        table.appendChild(tableBody);
        container.appendChild(table);
        container.setAttribute('style', 'padding: 8px 0');
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * This function is to update the card layout based on state.
   */
  updateInterface(): void {
    // Check state
    switch (true) {
      case !this.walletService.isMetaMask: this.text = 'Please install MetaMask'; break; // Check whether MetaMask extension is installed
      case this.wallet.length === 0: this.text = 'Click to connect MetaMask'; break;     // Check whether user has signed in with MetaMask
      default: this.text = `Address: ${this.wallet}`;                                    // Signed in with MetaMask
    }

    // Remove table if table exists to prevent displaying multiple tables
    const container = document.getElementById('transactions');
    if (container && container.hasChildNodes()) {
      container.removeChild(container.firstChild!);
      container.setAttribute('style', 'padding: 0');
    }

    // Show logout button if user is signed in
    document.getElementById('logout')?.setAttribute('style', `display: ${this.wallet.length > 0 ? 'inline' : 'none'}`);
  }

  /**
   * Logout function
  */
  logout(): void {
    // Remove wallet address and update interface
    this.wallet = '';
    this.updateInterface();
  }
}
