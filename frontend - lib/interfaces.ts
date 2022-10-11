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
  author: string[];
  comments: any[];
  lastUpdatedAt: string;
  likes?: any[];
  _v: number;
  _id: string;
}
