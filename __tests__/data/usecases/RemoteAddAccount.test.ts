import {RemoteAddAccount} from '../../../src/data/usecases/RemoteAddAccount';
import {HttpClientSpy, makeAddAccountModel, makeSut} from '../data.helper';

describe('Remote Add Acount Tests', () => {
  it('test add should dall httpclient with correct url', () => {
    const url = new URL('http://any-url.com');
    const sut = makeSut(url);
    sut.remoteAddAccount.add(makeAddAccountModel());
    expect(sut.httpClient.urls).toEqual([url]);
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
