import { TComments } from "./types";
import { TAuthor } from "./types";

export interface ISignup {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IPost {
  author: TAuthor[];
  comments: TComments[];
  content: string;
  lastUpdatedAt: string;
  timestamp: string;
  likes: any[];
  _v: number;
  _id: string;
}
