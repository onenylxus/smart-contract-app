import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ContractService } from '../contract/contract.service';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  public title = '';

	@Input()
	set text(name: string) {
		this.title = name;
	}

	@Output() btnClick = new EventEmitter();

  constructor(private contractService: ContractService) {
    if (!this.contractService.isMetaMask) {
      console.log('MetaMask is not detected in this browser. Please install MetaMask to continue.');
    } else {
      console.log('MetaMask detected.');
      this.contractService.requestAccounts().then((accounts) => console.log(accounts));
    }
  }

	onClick() {
    console.log('Connecting...');
		this.contractService.connectAccount();
	}
}
