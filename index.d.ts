import { IncomingMessage } from "http";
import express from "express";

declare global {
  namespace Express {
    interface AuthInfo {}
    interface User {} // <- User 타입 정의 부분 (Empty)
    interface Request {
      decodedData?: {
        discord_id: string;
        iat: number;
        exp: number;
      };
      // login(user: User, done: (err: any) => void): void;
      // logout(): void;
      // logOut(): void;
      // isAuthenticated(): boolean;
      // isUnauthenticated(): boolean;
    }
  }
}
