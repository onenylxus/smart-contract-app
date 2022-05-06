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

  onClick(): void {
    this.updateInterface();

    const container = document.getElementById('contracts')!;
    this.contract = (document.getElementById('contractAddress')! as HTMLInputElement).value;

    this.contractService.getTransactions(this.contract).subscribe((result) => {
      const data = result.result.map((transaction: any) => ({ from: transaction.from, to: transaction.to }));

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

      table.appendChild(tableBody);
      container.appendChild(table);
      container.setAttribute('style', 'padding: 8px 0');
    });
  }

  updateInterface(): void {
    this.text = `Contract Address: ${this.contract}`;

    const container = document.getElementById('contracts');
    if (container && container.hasChildNodes()) {
      container.removeChild(container.firstChild!);
      container.setAttribute('style', 'padding: 0');
    }
  }
}
