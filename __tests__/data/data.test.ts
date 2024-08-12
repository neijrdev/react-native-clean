import {AddAccountModel} from '../../src/domain/AddAccount';
import {HttpClientSpy, makeAddAccountModel} from './data.helper';

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
    let url = new URL('http://any-url.com')!;
    let httpClient = new HttpClientSpy();
    const sut = new RemoteAddAccount(url, httpClient);
    sut.add(makeAddAccountModel());
    expect(httpClient.url).toBe(url);
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
