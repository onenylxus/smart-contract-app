import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public constructor(private http: HttpClient) {}

  public getTransactions(address: string): Observable<any> {
    return this.http.get(`https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=desc&apikey=${environment.apiKey}`);
  }
}
