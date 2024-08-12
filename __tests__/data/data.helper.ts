import {AddAccountModel} from '../../src/domain/AddAccount';
import {HttpPostClient} from './data.test';

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
