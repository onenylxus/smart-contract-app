import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContractService } from '../contract/contract.service';

@Component({
  selector: 'app-contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.css']
})
export class ContractCardComponent {
  public message: string = '';
  private contract: string = '';

  @Input() set text(value: string) {
    this.message = value;
  }

  @Output() btnClick = new EventEmitter();

  constructor(private contractService: ContractService) {
    this.updateInterface();
  }

  /**
   * Maps the transaction data to the table in app
   */
  onClick(): void {
    this.updateInterface();

    const container = document.getElementById('contracts')!;
    this.contract = (document.getElementById('contractAddress')! as HTMLInputElement).value;

    // Get transactions involving the contract address
    this.contractService.getTransactions(this.contract).subscribe((result) => {
      /*
        Process transaction table from result.result
        In this case we only take 'from', 'to' and 'value' properties from the table
      */
      const data = result.result.map((transaction: any) => ({ from: transaction.from, to: transaction.to }));

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
          cell.setAttribute('style', 'border: 1px solid; font-size: 14px;');
          row.appendChild(cell);
        });
        tableBody.appendChild(row);
      });

      // Append table into card element
      table.appendChild(tableBody);
      container.appendChild(table);
      container.setAttribute('style', 'padding: 8px 0');
    });
  }

  /**
   * Append changes on the table to the interface
   */
  updateInterface(): void {
    this.text = `Contract Address: ${this.contract}`;

    const container = document.getElementById('contracts');
    if (container && container.hasChildNodes()) {
      container.removeChild(container.firstChild!);
      container.setAttribute('style', 'padding: 0');
    }
  }
}
