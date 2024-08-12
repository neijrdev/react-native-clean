import {AddAccountResult} from '../../data/usecases/RemoteAddAccount';

export interface AddAccountI {
  add(
    addAccountModel: AddAccountModelI,
    completion: (result: AddAccountResult) => void,
  ): Promise<void>;
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
