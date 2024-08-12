import {AddAccountModelI} from '../domain/AddAccount';
import {HttpPostClientI} from './HttpPostClient';

export class RemoteAddAccount {
  private url!: URL;
  private httpClient!: HttpPostClientI;

  constructor(url: URL, httpClient: HttpPostClientI) {
    this.url = url;
    this.httpClient = httpClient;
  }

  add(addAccountModel: AddAccountModelI) {
    this.httpClient.post(this.url, addAccountModel);
  }
}
