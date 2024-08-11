import {AccountModel} from './AccountModel';

export interface AddAccount {
  add(addAccountModel: AddAccountModel): Promise<AccountModel>;
}

export interface AddAccountModel {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
