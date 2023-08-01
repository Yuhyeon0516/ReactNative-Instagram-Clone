export type FeedInfo = {
  id: string;
  content: string;
  writer: {
    name: string;
    uid: string;
  };
  image: string;
  likeHistory: string[];
  createdAt: number;
};
