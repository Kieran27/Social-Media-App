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

export type TLoginError = {
  error: string;
};

export type TCommentCreate = {
  commentContent: string;
};

export type TPostUpdate = {
  updatedPostContent: string;
};

export type TCommentUpdate = {
  updatedCommentContent: string;
};

export type TUpdatedCommentData = {
  updatedCommentContent: string;
  postId: string;
  commentId: string;
};

export type TUserStat = {
  friends: string[];
  username: string;
  _id: string;
};
