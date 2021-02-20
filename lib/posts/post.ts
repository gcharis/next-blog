export interface Post {
  id: string;
  title: string;
  content: string;
  published_at: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface Author {
  username: string;
  email: string;
  id: string;
}
