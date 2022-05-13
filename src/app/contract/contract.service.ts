import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public constructor(private http: HttpClient) {}

  /**
  * Returns the list of transactions done upon this wallet using the EtherScan API
  */
  public getTransactions(address: string): Observable<any> {
  /*
    The api link below has a few options, for details please check https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-erc721-token-transfer-events-by-address
    To run the api in main net please delete "-rinkeby" from the link below
  */
    return this.http.get(`https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=desc&apikey=${environment.apiKey}`);
  }
}
