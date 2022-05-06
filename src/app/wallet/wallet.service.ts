import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import detectEthereumProvider from '@metamask/detect-provider';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private ethereum: any;

  public constructor(private http: HttpClient) {
    detectEthereumProvider().then((provider) => {
      this.ethereum = provider;
    });
  }

  public get isMetaMask(): boolean {
    return !!window.ethereum;
  }

  public async signOut(): Promise<any> {
    return await this.ethereum.request({method:"eth_requestAccounts", params: [{eth_accounts: {}}]})
  }

  public async signIn(): Promise<any> {
    if (!this.isMetaMask) { return Promise.reject(); }
    return await this.ethereum.request({ method: 'eth_requestAccounts' });
  }

  public getTransactions(address: string): Observable<any> {
    return this.http.get(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=9MNQK7FGSEUV371Y7K8ZNFK2T7NC5T1UIF`);
  }
}
