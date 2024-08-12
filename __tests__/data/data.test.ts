import {AddAccountModel} from '../../src/domain/AddAccount';
import {HttpClientSpy, makeAddAccountModel, makeSut} from './data.helper';

export class RemoteAddAccount {
  private url!: URL;
  private httpClient!: HttpPostClient;

  constructor(url: URL, httpClient: HttpPostClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  add(addAccountModel: AddAccountModel) {
    this.httpClient.post(this.url, addAccountModel);
  }
}

export interface HttpPostClient {
  post(url: URL, data: AddAccountModel): void;
}

describe('Remote Add Acount Tests', () => {
  it('test add should dall httpclient with correct url', () => {
    const url = new URL('http://any-url.com');
    const sut = makeSut(url);
    sut.remoteAddAccount.add(makeAddAccountModel());
    expect(sut.httpClient.url).toEqual(url);
  });

  it('test add should dall httpclient with correct data', () => {
    let url = new URL('http://any-url.com')!;
    let httpClient = new HttpClientSpy();
    const sut = new RemoteAddAccount(url, httpClient);
    const addAccountModel = makeAddAccountModel();
    sut.add(addAccountModel);
    expect(httpClient.data).toEqual(addAccountModel);
  });
});
