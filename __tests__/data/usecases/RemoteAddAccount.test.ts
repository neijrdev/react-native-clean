import {HttpErrors} from '../../../src/data/http/Errors';
import {DomainErrors} from '../../../src/domain/errors/Errors';
import {makeAccountModel, makeAddAccountModel, makeSut} from '../data.helper';

describe('Remote Add Acount Tests', () => {
  it('test add should dall httpclient with correct url', () => {
    const url = new URL('http://any-url.com');
    const sut = makeSut(url);
    sut.remoteAddAccount.add(makeAddAccountModel(), async () => {});
    expect(sut.httpClientSpy.urls).toEqual([url]);
  });

  it('test add should dall httpclient with correct data', () => {
    const sut = makeSut();
    const addAccountModel = makeAddAccountModel();
    sut.remoteAddAccount.add(addAccountModel, async () => {});
    expect(sut.httpClientSpy.data).toEqual(addAccountModel);
  });

  it('test add should complete with error with client completes with error', async () => {
    //GIVEN
    const {remoteAddAccount, httpClientSpy} = makeSut();
    let expectedError;
    remoteAddAccount.add(makeAddAccountModel(), async result => {
      expectedError = result;
    });

    //WHEN
    httpClientSpy.completionError(HttpErrors.noConnectivity);

    //THEN
    expect(expectedError).toEqual(DomainErrors.Unexpected);
  });

  it('test add should complete with error with client completes with valid and expected data', async () => {
    //GIVEN
    const {remoteAddAccount, httpClientSpy} = makeSut();
    let expectedAccount;
    remoteAddAccount.add(makeAddAccountModel(), async result => {
      expectedAccount = result;
    });

    //WHEN - mock success
    httpClientSpy.completionData(makeAccountModel());

    //THEN
    expect(expectedAccount).toEqual(makeAccountModel());
  });

  it('test add should complete with error with client completes with invalid Json data', async () => {
    //GIVEN
    const {remoteAddAccount, httpClientSpy} = makeSut();
    let expectedAccount;
    remoteAddAccount.add(makeAddAccountModel(), async result => {
      expectedAccount = result;
    });

    //WHEN - mock success
    httpClientSpy.completionData('invalid json data');

    //THEN
    expect(expectedAccount).toEqual(DomainErrors.Unexpected);
  });

  it('test add should complete with error with client completes with unexpected Json data', async () => {
    //GIVEN
    const {remoteAddAccount, httpClientSpy} = makeSut();
    let expectedAccount;
    remoteAddAccount.add(makeAddAccountModel(), async result => {
      expectedAccount = result;
    });

    //WHEN - mock success
    httpClientSpy.completionData({other: 'data', data: {}});

    //THEN
    expect(expectedAccount).toEqual(DomainErrors.Unexpected);
  });
});
