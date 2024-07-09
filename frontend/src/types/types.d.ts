export interface User {
  login: string;
  username?: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string;
  company?: string | null;
  blog?: string;
  location?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description?: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  language?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Follower {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}