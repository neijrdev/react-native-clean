import {HttpPostClientI} from '../../src/data/HttpPostClient';
import {RemoteAddAccount} from '../../src/data/RemoteAddAccount';
import {AddAccountModel} from '../../src/domain/AddAccount';

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

export class HttpClientSpy implements HttpPostClientI {
  url!: URL;
  data!: any;

  post(url: URL, data?: AddAccountModel) {
    this.url = url;
    this.data = data;
  }
}
