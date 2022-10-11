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
  author: Author[];
  comments: any[];
  content: string;
  lastUpdatedAt: string;
  timestamp: string;
  likes?: any[];
  _v: number;
  _id: string;
}

type Author = {
  username: string;
  _id: string;
};
