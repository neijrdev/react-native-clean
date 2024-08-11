class RemoteAddAccount {
  private url!: URL;
  private httpClient!: HttpPostClient;

  constructor(url: URL, httpClient: HttpPostClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  add() {
    this.httpClient.post(this.url);
  }
}

interface HttpPostClient {
  post(url: URL): void;
}

describe('Remote Add Acount Tests', () => {
  it('test add should dall httpclient with correct url', () => {
    let url = new URL('http://any-url.com')!;
    let httpClient = new HttpClientSpy();
    const sut = new RemoteAddAccount(url, httpClient);
    sut.add();
    expect(httpClient.url).toBe(url);
  });
});

class HttpClientSpy implements HttpPostClient {
  url!: URL;

  post(url: URL) {
    this.url = url;
  }
}
