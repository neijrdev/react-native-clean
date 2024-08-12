import {DomainErrors} from '../../domain/errors/Errors';
import {AccountModelI} from '../../domain/models/AccountModel';
import {JsonSerializer} from '../../domain/models/Model';
import {AddAccountI, AddAccountModelI} from '../../domain/usecases/AddAccount';
import {HttpPostClientI} from '../http/HttpPostClient';

const expectedKeysAccountModelResult: (keyof AccountModelI)[] = [
  'id',
  'name',
  'email',
  'password',
];

export type AddAccountResult = AccountModelI | DomainErrors;

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
      try {
        completion(
          JsonSerializer.fromJson<AccountModelI>(
            result,
            expectedKeysAccountModelResult,
          ),
        );
      } catch (error) {
        completion(DomainErrors.Unexpected);
      }
    });
  }
}
