import {AddAccountModel} from '../../src/domain/AddAccount';
import {HttpPostClient, RemoteAddAccount} from './data.test';

export class HttpClientSpy implements HttpPostClient {
  url!: URL;
  data!: any;

  post(url: URL, data?: AddAccountModel) {
    this.url = url;
    this.data = data;
  }
}

export function makeAddAccountModel(): AddAccountModel {
  return new AddAccountModel(
    'Jane Doe',
    'jane.doe@example.com',
    'securePassword123',
    'securePassword123',
  );
}

export function makeSut(url = new URL('http://any-url.com')) {
  let httpClient = new HttpClientSpy();
  let remoteAddAccount = new RemoteAddAccount(url, httpClient);

  return {
    remoteAddAccount,
    httpClient,
  };
}
