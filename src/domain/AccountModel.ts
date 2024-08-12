export interface AccountModelI {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class AccountModel implements AccountModelI {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
