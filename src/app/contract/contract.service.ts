import { Injectable } from '@angular/core';
import Web3 from "web3";
import Web3Modal from "web3modal";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private web3js: any;
  private provider: any;
  private accounts: any;
  private web3Modal: any;

  private accountStatusSource: Subject<any> = new Subject<any>();
  public accountStatus$: Observable<any> = this.accountStatusSource.asObservable();

  public constructor() {
    const providerOptions = {};

    this.web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions,
      disableInjectedProvider: false,
    });
  }

  public get isMetaMask(): boolean {
    return !!window.ethereum && window.ethereum.isMetaMask;
  }

  public async connectAccount(): Promise<void> {
    if (!this.isMetaMask) { return; }

    this.web3Modal.clearCachedProvider();
    this.provider = await this.web3Modal.connect();
    this.web3js = new Web3(this.provider);
    this.accounts = await this.web3js.eth.getAccounts();
    this.accountStatusSource.next(this.accounts);
  }

  public async requestAccounts(): Promise<any> {
    if (!this.isMetaMask) { return; }
    const eth = window.ethereum;

    await eth.enable();
    return await eth.request({ method: 'eth_requestAccounts' });
  }
}
