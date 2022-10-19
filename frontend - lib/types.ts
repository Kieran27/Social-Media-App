export type TAuthor = {
  username: string;
  _id: string;
};

export type TComments = {
  content: string;
  lastUpdatedAt: string;
  likes: any[];
  postId: string;
  _v: number;
  _id: number;
};

export type TPostId = {
  postId: string | string[] | undefined;
};

export type TToken = {
  username: string;
  id: string;
  iat: string;
  exp: string;
};
