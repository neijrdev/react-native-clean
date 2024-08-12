import {AccountModel} from './AccountModel';

export interface AddAccountI {
  add(addAccountModel: AddAccountModelI): Promise<AccountModel>;
}

export interface AddAccountModelI {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export class AddAccountModel implements AddAccountModelI {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.passwordConfirmation = passwordConfirmation;
  }
}
