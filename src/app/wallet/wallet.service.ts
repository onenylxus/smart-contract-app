import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import detectEthereumProvider from '@metamask/detect-provider';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  public constructor(private http: HttpClient) {}

  public signOut(): void {

  }

  public signIn(): Observable<any> | undefined {
    let ethereum: any;

    return from(detectEthereumProvider()).pipe(
      switchMap(async (provider) => {
        if(!provider) {
          throw new Error('Please install MetaMask');
        }
        ethereum = provider;

        return await ethereum.request({ method: 'eth_requestAccounts' });
      }),

      switchMap(() => {
        const transaction = this.http.get(`https://api.etherscan.io/api?module=account&action=txlistinternal&address=${ethereum.selectedAddress}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`);
        return transaction;
      }),
    );
  }
}
