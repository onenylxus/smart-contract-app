import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import detectEthereumProvider from '@metamask/detect-provider';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private ethereum: any;

  public constructor(private http: HttpClient) {
    // Detect Ethereum provider and link to service
    detectEthereumProvider().then((provider) => {
      this.ethereum = provider;
    });
  }

  /**
   * Check whether MetaMask is installed
   * A simple method is to check whether window.ethereum is defined or not
   */
  public get isMetaMask(): boolean {
    return !!window.ethereum;
  }

  /**
   * Sign out function
   * However, this is technically not possible to disconnect wallet with MetaMask
   * An alternative is to store and remove wallet address in component to change states manually
   */
  public async signOut(): Promise<any> {
    return await this.ethereum.request({method:"eth_requestAccounts", params: [{eth_accounts: {}}]})
  }

  /**
   * Sign in function
   * This calls MetaMask to authenticate the application, and then connect the wallet
   */
  public async signIn(): Promise<any> {
    if (!this.isMetaMask) { return Promise.reject(); }
    return await this.ethereum.request({ method: 'eth_requestAccounts' });
  }

  /**
   * Returns the list of transactions done upon this wallet using the EtherScan API
   */
  public getTransactions(address: string): Observable<any> {
    /*
      The api link below has a few options, for details please check https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-erc721-token-transfer-events-by-address
      To run the api in main net please delete "-rinkeby" from the link below
    */
    return this.http.get(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${environment.apiKey}`);
  }
}
