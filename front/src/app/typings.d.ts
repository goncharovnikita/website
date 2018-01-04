declare type mediumFeed = {
  status: string;
  items: mediumFeedUnit[];
}

declare type mediumFeedUnit = {
  title: string;
  pubDate: string;
  description: string;
  link: string;
}

declare type gitRepoUnit = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
  }
  html_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string;
  stargazers_count: number;
  watchers_count: number;
}