import {Request} from "express-serve-static-core";


declare module 'express-serve-static-core' {
  interface Request {
    user: UserSession
  }
}

export interface UserSession {
      subId: number;
      nombre: string;
      roles: string[];
}


export interface TypedRequestBody<T> extends Request{
  body: T;
}
