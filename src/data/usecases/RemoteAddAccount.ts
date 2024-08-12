import {AddAccountModelI} from '../../domain/usecases/AddAccount';
import {HttpErrors} from '../http/Errors';
import {HttpPostClientI} from '../http/HttpPostClient';

export class RemoteAddAccount {
  private url!: URL;
  private httpClient!: HttpPostClientI;

  constructor(url: URL, httpClient: HttpPostClientI) {
    this.url = url;
    this.httpClient = httpClient;
  }

  async add(
    addAccountModel: AddAccountModelI,
    completion: (error: HttpErrors) => void,
  ) {
    this.httpClient.post(this.url, addAccountModel, error => {
      completion(error);
    });
  }
}
