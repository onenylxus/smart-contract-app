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

  constructor(private contractService: ContractService) {}

	onClick() {
    console.log('Connecting...');
		this.contractService.connectAccount();
	}
}
