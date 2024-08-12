import {HttpErrors} from '../../src/data/http/Errors';
import {HttpPostClientI} from '../../src/data/http/HttpPostClient';

import {
  AddAccountResult,
  RemoteAddAccount,
} from '../../src/data/usecases/RemoteAddAccount';
import {
  AccountModel,
  AccountModelI,
} from '../../src/domain/models/AccountModel';
import {AddAccountModel} from '../../src/domain/usecases/AddAccount';

export function makeAddAccountModel(
  name = 'Jane Doe',
  email = 'jane.doe@example.com',
  password = 'securePassword123',
  passwordConfirmation = 'securePassword123',
): AddAccountModel {
  return new AddAccountModel(name, email, password, passwordConfirmation);
}

export function makeAccountModel(
  id = '1',
  name = 'jane doe',
  email = 'jane.doe@example.com',
  password = 'securePassword123',
): AccountModelI {
  return new AccountModel(id, email, name, password);
}

export function makeSut(url = new URL('http://any-url.com')) {
  let httpClientSpy = new HttpClientSpy();
  let remoteAddAccount = new RemoteAddAccount(url, httpClientSpy);

  return {
    sut: remoteAddAccount,
    httpClientSpy,
  };
}

export class HttpClientSpy implements HttpPostClientI {
  readonly urls: URL[] = [];
  data!: any;
  completion!: (error: HttpErrors) => void;

  post(url: URL, data: any, completion: (error: HttpErrors) => void): void {
    this.urls.push(url);
    this.data = data;
    this.completion = completion;
  }

  completionError(error: HttpErrors) {
    this.completion(error);
  }

  completionData(data: any) {
    this.completion(data);
  }
}
export function expectResult(
  sut: RemoteAddAccount,
  expectedResult: AddAccountResult,
  action: () => void,
) {
  let receivedResult: AddAccountResult | null = null;

  sut.add(makeAddAccountModel(), async result => {
    receivedResult = result;
  });

  action();

  expect(receivedResult).toEqual(expectedResult);
}

export function makeInvalidJsonData() {
  return 'invalid json data';
}
export function makeInvalidExpectedJsonData() {
  return {other: 'data', data: {}};
}

export function makeURL() {
  return new URL('http://any-url.com');
}
