import {makeAddAccountModel, makeSut} from '../data.helper';

describe('Remote Add Acount Tests', () => {
  it('test add should dall httpclient with correct url', () => {
    const url = new URL('http://any-url.com');
    const sut = makeSut(url);
    sut.remoteAddAccount.add(makeAddAccountModel());
    expect(sut.httpClient.urls).toEqual([url]);
  });

  it('test add should dall httpclient with correct data', () => {
    const sut = makeSut();
    const addAccountModel = makeAddAccountModel();
    sut.remoteAddAccount.add(addAccountModel);
    expect(sut.httpClient.data).toEqual(addAccountModel);
  });
});
