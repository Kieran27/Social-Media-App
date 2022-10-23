import { TComments, TUserStat } from "./types";
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
  author: TAuthor;
  comments: TComments[];
  content: string;
  lastUpdatedAt: string;
  timestamp: string;
  likes: string[];
  _v: number;
  _id: string;
}

export interface IComment {
  author: TAuthor;
  content: string;
  lastUpdatedAt: string;
  likes: string[];
  postId: string;
  replies: string[];
  timestamp: string;
  _v: number;
  _id: string;
}

export interface IUserStats {
  userComments: string[];
  userPosts: string[];
  userProfile: TUserStat;
}
