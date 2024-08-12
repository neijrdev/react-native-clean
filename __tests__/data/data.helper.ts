import {HttpErrors} from '../../src/data/http/Errors';
import {HttpPostClientI} from '../../src/data/http/HttpPostClient';
import {RemoteAddAccount} from '../../src/data/usecases/RemoteAddAccount';
import {AddAccountModel} from '../../src/domain/usecases/AddAccount';

export function makeAddAccountModel(): AddAccountModel {
  return new AddAccountModel(
    'Jane Doe',
    'jane.doe@example.com',
    'securePassword123',
    'securePassword123',
  );
}

export function makeSut(url = new URL('http://any-url.com')) {
  let httpClientSpy = new HttpClientSpy();
  let remoteAddAccount = new RemoteAddAccount(url, httpClientSpy);

  return {
    remoteAddAccount,
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
}
