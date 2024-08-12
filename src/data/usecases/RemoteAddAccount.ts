import {AccountModelI} from '../../domain/models/AccountModel';
import {AddAccountI, AddAccountModelI} from '../../domain/usecases/AddAccount';
import {HttpErrors} from '../http/Errors';
import {HttpPostClientI} from '../http/HttpPostClient';

export type AddAccountResult = AccountModelI | HttpErrors;

export class RemoteAddAccount implements AddAccountI {
  private url!: URL;
  private httpClient!: HttpPostClientI;

  constructor(url: URL, httpClient: HttpPostClientI) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async add(
    addAccountModel: AddAccountModelI,
    completion: (result: AddAccountResult) => void,
  ) {
    this.httpClient.post(this.url, addAccountModel, result => {
      completion(result);
    });
  }
}
