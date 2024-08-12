import {HttpErrors} from './Errors';

export interface HttpPostClientI {
  post(url: URL, data: any, completion: (error: HttpErrors) => void): void;
}
