import {HttpErrors} from './Errors';

export type Data = any;

export type PostResult = Data | HttpErrors;

export interface HttpPostClientI {
  post(url: URL, data: any, completion: (result: PostResult) => void): void;
}
