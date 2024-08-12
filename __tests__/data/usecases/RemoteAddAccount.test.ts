import {HttpErrors} from '../../../src/data/http/Errors';
import {DomainErrors} from '../../../src/domain/errors/Errors';
import {
  expectResult,
  makeAccountModel,
  makeAddAccountModel,
  makeSut,
} from '../data.helper';

describe('Remote Add Account Tests', () => {
  it('test add should call httpClient with correct url', () => {
    const url = new URL('http://any-url.com');
    const {sut, httpClientSpy} = makeSut(url);
    sut.add(makeAddAccountModel(), async () => {});
    expect(httpClientSpy.urls).toEqual([url]);
  });

  it('test add should call httpClient with correct data', () => {
    const {sut, httpClientSpy} = makeSut();
    const addAccountModel = makeAddAccountModel();
    sut.add(addAccountModel, async () => {});
    expect(httpClientSpy.data).toEqual(addAccountModel);
  });

  it('test add should complete with error with client completes with error', () => {
    //GIVEN
    const {sut, httpClientSpy} = makeSut();
    expectResult(sut, DomainErrors.Unexpected, () => {
      //WHEN - mock  success
      httpClientSpy.completionData(HttpErrors.noConnectivity);
    });
  });

  it('test add should complete with error with client completes with valid and expected data', () => {
    // //GIVEN
    const {sut, httpClientSpy} = makeSut();
    expectResult(sut, makeAccountModel(), () => {
      //WHEN - mock  success
      httpClientSpy.completionData(makeAccountModel());
    });
  });

  it('test add should complete with error with client completes with invalid Json data', () => {
    // //GIVEN
    const {sut, httpClientSpy} = makeSut();
    expectResult(sut, DomainErrors.Unexpected, () => {
      //WHEN - mock  failure
      httpClientSpy.completionData('invalid json data');
    });
  });

  it('test add should complete with error with client completes with unexpected Json data', () => {
    // //GIVEN
    const {sut, httpClientSpy} = makeSut();
    expectResult(sut, DomainErrors.Unexpected, () => {
      //WHEN - mock failure
      httpClientSpy.completionData({other: 'data', data: {}});
    });
  });
});
